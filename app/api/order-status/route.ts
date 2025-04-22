import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get order_id from URL
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order_id parameter' },
        { status: 400 }
      );
    }

    console.log(`Checking status for order: ${orderId}`);

    // Initialize Supabase client with admin privileges
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get order details from Supabase
    const { data: orderData, error: orderError } = await supabase
      .from('coin_orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (orderError || !orderData) {
      console.error('Order not found:', orderId);
      return NextResponse.json(
        { error: 'Order not found', details: orderError },
        { status: 404 }
      );
    }

    // Check order status with Cashfree
    const cashfreeResponse = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2022-09-01'
      }
    });

    const cashfreeData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error('Cashfree API error:', cashfreeData);
      return NextResponse.json(
        { error: 'Failed to get order status from Cashfree', details: cashfreeData },
        { status: 500 }
      );
    }

    console.log(`Cashfree status for order ${orderId}: ${cashfreeData.order_status}, current DB status: ${orderData.status}`);

    // Update order status in Supabase if changed
    if (orderData.status !== cashfreeData.order_status) {
      console.log(`Updating order status from ${orderData.status} to ${cashfreeData.order_status}`);
      
      const { error: updateError } = await supabase
        .from('coin_orders')
        .update({ status: cashfreeData.order_status, updated_at: new Date().toISOString() })
        .eq('order_id', orderId);

      if (updateError) {
        console.error('Error updating order status:', updateError);
      }

      // If payment is successful, add coins to user balance
      if (cashfreeData.order_status === 'PAID' && orderData.status !== 'PAID') {
        console.log(`Payment successful for order ${orderId}. Adding ${orderData.coins} coins to user ${orderData.user_id}`);
        
        // Add transaction record
        const { error: transactionError } = await supabase
          .from('coin_transactions')
          .insert({
            user_id: orderData.user_id,
            amount: orderData.coins,
            transaction_type: 'purchase',
            description: `Purchased ${orderData.coins} coins via Cashfree (Order ID: ${orderId})`
          });

        if (transactionError) {
          console.error('Error creating transaction record:', transactionError);
        }
        
        // Update user's coin balance
        const { data: userData, error: getUserError } = await supabase
          .from('users')
          .select('coin_balance')
          .eq('id', orderData.user_id)
          .single();
          
        if (getUserError) {
          console.error('Error fetching user:', getUserError);
        } else {
          const currentBalance = userData.coin_balance || 0;
          const newBalance = currentBalance + orderData.coins;
          
          const { error: updateUserError } = await supabase
            .from('users')
            .update({ coin_balance: newBalance, updated_at: new Date().toISOString() })
            .eq('id', orderData.user_id);
            
          if (updateUserError) {
            console.error('Error updating user balance:', updateUserError);
          } else {
            console.log(`User balance updated successfully. New balance: ${newBalance} coins`);
          }
        }
      }
    }

    // Return order status
    return NextResponse.json({
      success: true,
      order_id: orderData.order_id,
      status: cashfreeData.order_status,
      amount: orderData.amount,
      coins: orderData.coins
    });
  } catch (error) {
    console.error('Error in order-status API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
} 
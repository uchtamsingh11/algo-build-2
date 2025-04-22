import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { userId, coins, amount } = await request.json();

    if (!userId || !coins || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, coins, amount' },
        { status: 400 }
      );
    }

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

    // Generate a unique order ID
    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Create order in Cashfree
    const cashfreeResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2022-09-01'
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: userId,
          customer_phone: '9999999999', // This should be dynamically retrieved in a production environment
          customer_email: 'test@example.com' // This should be dynamically retrieved in a production environment
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment-status?order_id={order_id}&order_token={order_token}`
        }
      })
    });

    const cashfreeData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error('Cashfree API error:', cashfreeData);
      return NextResponse.json(
        { error: 'Failed to create Cashfree order', details: cashfreeData },
        { status: 500 }
      );
    }

    // Store order in Supabase
    const { error } = await supabase
      .from('coin_orders')
      .insert({
        user_id: userId,
        order_id: orderId,
        amount: amount,
        coins: coins,
        status: 'PENDING',
        payment_session_id: cashfreeData.payment_session_id,
        cashfree_order_id: cashfreeData.cf_order_id
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create order record', details: error },
        { status: 500 }
      );
    }

    // Return necessary data for client-side checkout
    return NextResponse.json({
      success: true,
      payment_session_id: cashfreeData.payment_session_id,
      order_id: orderId
    });
  } catch (error) {
    console.error('Error in create-order API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
} 
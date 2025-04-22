"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface OrderStatus {
  success: boolean;
  order_id: string;
  status: string;
  amount: number;
  coins: number;
}

function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    
    if (!orderId) {
      setError('Missing order ID');
      setLoading(false);
      return;
    }

    // Check the order status
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/order-status?order_id=${orderId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to get order status');
        }
        
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    
    // Poll for updates if the status is still pending
    const interval = setInterval(() => {
      if (status && status.status !== 'PAID' && status.status !== 'FAILED') {
        checkStatus();
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [searchParams, status]);

  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-xl shadow-xl">
        <div className="flex flex-col items-center justify-center text-center">
          {loading ? (
            <>
              <Loader2 className="h-16 w-16 text-amber-500 animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Processing Payment
              </h1>
              <p className="text-zinc-400">
                Please wait while we confirm your payment...
              </p>
            </>
          ) : error ? (
            <>
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Something Went Wrong
              </h1>
              <p className="text-zinc-400 mb-6">{error}</p>
            </>
          ) : status?.status === 'PAID' ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="text-zinc-400 mb-2">
                Thank you for your purchase!
              </p>
              <div className="bg-zinc-800 rounded-lg p-4 w-full my-4">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-400">Amount:</span>
                  <span className="text-white font-medium">₹{status?.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Coins Added:</span>
                  <span className="text-amber-500 font-medium">{status?.coins}</span>
                </div>
              </div>
            </>
          ) : status?.status === 'FAILED' ? (
            <>
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Payment Failed
              </h1>
              <p className="text-zinc-400 mb-6">
                Your payment could not be processed. Please try again.
              </p>
            </>
          ) : (
            <>
              <Loader2 className="h-16 w-16 text-amber-500 animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Payment Pending
              </h1>
              <p className="text-zinc-400 mb-6">
                Your payment is being processed. Please wait...
              </p>
            </>
          )}

          <div className="mt-6">
            <Link href="/pricing">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-2 rounded-full">
                Back to Pricing
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Loading fallback for Suspense
function PaymentStatusLoading() {
  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-xl shadow-xl">
        <div className="flex flex-col items-center justify-center text-center">
          <Loader2 className="h-16 w-16 text-amber-500 animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Loading...
          </h1>
          <p className="text-zinc-400">
            Please wait while we load your payment status...
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<PaymentStatusLoading />}>
      <PaymentStatusContent />
    </Suspense>
  );
} 
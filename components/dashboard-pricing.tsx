"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, Coins, Plus, Minus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import TransactionHistoryModal from './transaction-history-modal'
import { createBrowserClient } from '@supabase/ssr'
import Script from 'next/script'

export default function DashboardPricing() {
    const [showHistory, setShowHistory] = useState(false);
    const [customAmount, setCustomAmount] = useState(500);
    const [userBalance, setUserBalance] = useState(0);
    const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);
    const [cashfreeReady, setCashfreeReady] = useState(false);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch user's coin balance on component mount
    useEffect(() => {
        async function fetchUserBalance() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('users')
                    .select('coin_balance')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user balance:', error);
                    return;
                }

                if (data) {
                    setUserBalance(data.coin_balance || 0);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserBalance();
    }, []);

    const handleHistoryClick = () => {
        setShowHistory(true);
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setCustomAmount(value);
    };

    const increaseAmount = () => {
        setCustomAmount(prev => prev + 1);
    };

    const decreaseAmount = () => {
        setCustomAmount(prev => Math.max(1, prev - 1));
    };

    const handlePurchase = async (coins: number, amount: number, buttonId: string) => {
        try {
            setLoadingButtonId(buttonId);
            
            // Get the current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please log in to purchase coins');
                setLoadingButtonId(null);
                return;
            }

            console.log(`Initiating purchase: ${coins} coins for ₹${amount}`);

            // Call the create-order API
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    coins,
                    amount,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            console.log(`Order created successfully. Order ID: ${data.order_id}`);

            // Initialize Cashfree checkout
            if (window.Cashfree && cashfreeReady) {
                const cashfree = new window.Cashfree();
                
                // Configure Cashfree checkout
                const checkoutOptions = {
                    paymentSessionId: data.payment_session_id,
                    redirectTarget: "_self",
                };
                
                console.log("Opening Cashfree checkout...");
                
                // Open Cashfree checkout
                cashfree.checkout(checkoutOptions);
            } else {
                console.error("Cashfree SDK not ready");
                alert('Payment gateway not ready. Please try again in a moment.');
            }
        } catch (error) {
            console.error('Error processing purchase:', error);
            alert('An error occurred while processing your purchase. Please try again.');
        } finally {
            setLoadingButtonId(null);
        }
    };

    return (
        <>
            {/* Cashfree SDK */}
            <Script 
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                onLoad={() => {
                    if (window.Cashfree) {
                        window.cashfree = window.Cashfree({
                            mode: "production", // Using production mode
                        });
                        setCashfreeReady(true);
                        console.log("Cashfree SDK loaded successfully");
                    } else {
                        console.error("Failed to load Cashfree SDK");
                    }
                }}
                onError={() => {
                    console.error("Error loading Cashfree SDK");
                }}
            />

            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div className="flex justify-end mb-8">
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 transition-all hover:shadow-md rounded-xl"
                        onClick={handleHistoryClick}
                    >
                        <Clock className="h-4 w-4" />
                        <span>History</span>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3 mx-auto max-w-5xl mt-10">
                    {/* Flexible Coin Purchase */}
                    <div className="aspect-square">
                        <Card className="flex flex-col h-full w-full bg-black border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
                            <div className="flex flex-col h-full p-6 justify-between">
                                {/* Top Section */}
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="flex items-center text-center">
                                        <span className="text-5xl font-bold text-white">{customAmount}</span>
                                        <Coins className="h-7 w-7 ml-2 text-amber-500" />
                                    </div>
                                    <span className="mt-3 text-2xl font-semibold text-white">₹{customAmount}</span>
                                    
                                    <div className="flex items-center gap-4 mt-6 w-full">
                                        <Button 
                                            onClick={decreaseAmount}
                                            variant="outline"
                                            className="h-10 w-10 p-0 rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                            disabled={customAmount <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        
                                        <div className="flex-1">
                                            <Input 
                                                type="number" 
                                                value={customAmount.toString()}
                                                onChange={handleAmountChange}
                                                className="bg-zinc-800 border-zinc-700 text-white text-center"
                                                min="1"
                                                step="1"
                                            />
                                        </div>
                                        
                                        <Button 
                                            onClick={increaseAmount}
                                            variant="outline"
                                            className="h-10 w-10 p-0 rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-400 text-center mt-2">1 Coin = ₹1</p>
                                </div>
                                
                                {/* Bottom Section */}
                                <div className="mt-6">
                                    <Button
                                        onClick={() => handlePurchase(customAmount, customAmount, 'flex')}
                                        className="w-full bg-zinc-800 text-white hover:bg-zinc-700 hover:shadow-lg py-4 rounded-full shadow-md transition-all"
                                        disabled={loadingButtonId !== null || customAmount < 1}
                                    >
                                        {loadingButtonId === 'flex' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="text-base font-medium">Buy Now</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Pro Plan */}
                    <div className="aspect-square">
                        <Card className="flex flex-col h-full w-full bg-black border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden relative z-10">
                            <div className="flex flex-col h-full p-6 justify-between">
                                {/* Top Section */}
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="flex items-center text-center">
                                        <span className="text-5xl font-bold text-white">1000</span>
                                        <Coins className="h-7 w-7 ml-2 text-amber-500" />
                                    </div>
                                    <span className="mt-3 text-2xl font-semibold text-white">₹999</span>
                                </div>
                                
                                {/* Bottom Section */}
                                <div className="mt-auto">
                                    <Button
                                        onClick={() => handlePurchase(1000, 999, 'pro')}
                                        className="w-full bg-zinc-800 text-white hover:bg-zinc-700 hover:shadow-lg py-4 rounded-full shadow-md transition-all"
                                        disabled={loadingButtonId !== null}
                                    >
                                        {loadingButtonId === 'pro' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="text-base font-medium">Buy Now</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Premium Plan */}
                    <div className="aspect-square">
                        <Card className="flex flex-col h-full w-full bg-black border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
                            <div className="flex flex-col h-full p-6 justify-between">
                                {/* Top Section */}
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="flex items-center text-center">
                                        <span className="text-5xl font-bold text-white">2500</span>
                                        <Coins className="h-7 w-7 ml-2 text-amber-500" />
                                    </div>
                                    <span className="mt-3 text-2xl font-semibold text-white">₹2249</span>
                                </div>
                                
                                {/* Bottom Section */}
                                <div className="mt-auto">
                                    <Button
                                        onClick={() => handlePurchase(2500, 2249, 'premium')}
                                        className="w-full bg-zinc-800 text-white hover:bg-zinc-700 hover:shadow-lg py-4 rounded-full shadow-md transition-all"
                                        disabled={loadingButtonId !== null}
                                    >
                                        {loadingButtonId === 'premium' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="text-base font-medium">Buy Now</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                
                <p className="text-center text-gray-400 mt-10 mb-6">Coins can be used to purchase any of our products and services across the platform.</p>

                {/* Transaction History Modal */}
                <TransactionHistoryModal 
                    isOpen={showHistory} 
                    onClose={handleCloseHistory} 
                />
            </div>
        </>
    )
}

// Type definition for Window to access Cashfree SDK
declare global {
    interface Window {
        Cashfree: any;
        cashfree: any;
    }
} 
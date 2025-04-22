import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Sparkles } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="bg-black py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl text-white">Pricing that Scales with You</h1>
                    <p className="text-gray-400">Choose the plan that's right for your trading style. From individual traders to institutional investors, we have options designed to maximize your trading potential.</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    {/* Basic Plan */}
                    <Card className="flex flex-col bg-zinc-900 border-gray-800 shadow-lg transform transition duration-300 hover:scale-105">
                        <CardHeader className="pb-2">
                            <CardTitle className="font-medium text-white text-xl mb-3">Basic</CardTitle>
                            <div className="relative">
                                <span className="block text-4xl font-bold text-white">1000</span>
                                <span className="text-sm absolute top-0 right-0 text-white font-medium">Z Coins</span>
                            </div>
                            <span className="mt-2 block text-2xl font-semibold text-white">₹999</span>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                            <hr className="border-dashed border-gray-800" />
                            <div className="py-3 flex flex-col h-full justify-center">
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 rounded-lg" />
                                    <div className="relative text-center">
                                        <p className="text-sm text-white font-medium mb-3">STARTER PACK</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="mt-auto pb-6">
                            <Button asChild className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 py-6 rounded-xl shadow-lg shadow-black/30">
                                <Link href="#start-trading">
                                    <span className="text-base font-medium">Buy Now</span>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="flex flex-col bg-zinc-900 border-gray-800 shadow-xl transform transition duration-300 hover:scale-105 relative z-10">
                        <CardHeader className="pb-2">
                            <CardTitle className="font-medium text-white text-xl mb-3">Pro</CardTitle>
                            <div className="relative">
                                <span className="block text-4xl font-bold text-white">2500</span>
                                <span className="text-sm absolute top-0 right-0 text-white font-medium">Z Coins</span>
                            </div>
                            <span className="mt-2 block text-2xl font-semibold text-white">₹2249</span>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                            <hr className="border-dashed border-gray-800" />
                            <div className="py-3 flex flex-col h-full justify-center">
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 rounded-lg" />
                                    <div className="relative text-center">
                                        <div className="flex items-center justify-center mb-3">
                                            <Sparkles className="text-white w-4 h-4 mr-1" />
                                            <p className="text-sm text-white font-medium">ENHANCED EXPERIENCE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="mt-auto pb-6">
                            <Button asChild className="w-full bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 py-6 rounded-xl shadow-lg shadow-black/30 border border-gray-600/20">
                                <Link href="#start-trading">
                                    <span className="text-base font-medium">Buy Now</span>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-900/90 border border-gray-800/60 shadow-2xl transform transition duration-300 hover:scale-105">
                        <CardHeader className="pb-2">
                            <CardTitle className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 text-xl mb-3">Premium</CardTitle>
                            <div className="relative">
                                <span className="block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">5000</span>
                                <span className="text-sm absolute top-0 right-0 text-white font-medium">Z Coins</span>
                            </div>
                            <span className="mt-2 block text-2xl font-semibold text-white">₹4499</span>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                            <hr className="border-dashed border-gray-800" />
                            <div className="py-3 flex flex-col h-full justify-center">
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 rounded-lg" />
                                    <div className="relative text-center">
                                        <div className="flex items-center justify-center mb-3">
                                            <div className="w-6 h-6 mr-1">
                                                <div className="w-full h-full bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
                                                    <Sparkles className="text-white w-3 h-3" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 font-bold">ULTIMATE POWER</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="mt-auto pb-6">
                            <Button asChild className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 py-6 rounded-xl shadow-lg shadow-black/30 border border-gray-600/20">
                                <Link href="#start-trading">
                                    <span className="text-base font-medium">Buy Now</span>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                
                <p className="text-center text-gray-400 mt-8">Z Coins can be used to purchase any of our products and services across the platform.</p>
            </div>
        </section>
    )
} 
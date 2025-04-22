"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Testimonials() {
    return (
        <section className="bg-black py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl text-white">Trusted by traders worldwide</h2>
                    <p className="text-gray-400">AlgoZ is more than just a trading platform. It's a comprehensive ecosystem helping traders and investors maximize their potential in the markets.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2 bg-zinc-900 border-gray-800">
                        <CardHeader>
                            <img className="h-6 w-fit" src="https://html.tailus.io/blocks/customers/nike.svg" alt="Nike Logo" height="24" width="auto" />
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium text-white">AlgoZ has transformed the way I approach the market. Their advanced algorithms and risk management tools have significantly improved my trading performance. The ability to customize strategies according to my risk profile has been invaluable. AlgoZ is a game-changer for serious traders.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage src="https://avatar.vercel.sh/rajesh" alt="Rajesh Sharma" height="400" width="400" loading="lazy" />
                                        <AvatarFallback>RS</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-medium text-white">Rajesh Sharma</cite>
                                        <span className="text-gray-400 block text-sm">Professional Trader</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-zinc-900 border-gray-800">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium text-white">The backtesting capabilities of AlgoZ are unmatched. I can test my strategies against years of historical data in minutes.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage src="https://avatar.vercel.sh/priya" alt="Priya Patel" height="400" width="400" loading="lazy" />
                                        <AvatarFallback>PP</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium text-white">Priya Patel</cite>
                                        <span className="text-gray-400 block text-sm">Hedge Fund Analyst</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900 border-gray-800">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-white">AlgoZ's machine learning models have helped me identify patterns I would have missed. Their predictive analytics are remarkably accurate.</p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage src="https://avatar.vercel.sh/vikram" alt="Vikram Mehta" height="400" width="400" loading="lazy" />
                                        <AvatarFallback>VM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium text-white">Vikram Mehta</cite>
                                        <span className="text-gray-400 block text-sm">Data Scientist</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900 border-gray-800">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-white">As a novice trader, AlgoZ's educational resources and intuitive interface have been invaluable. I feel confident making trades with their AI guidance.</p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage src="https://avatar.vercel.sh/anjali" alt="Anjali Gupta" height="400" width="400" loading="lazy" />
                                        <AvatarFallback>AG</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-white">Anjali Gupta</p>
                                        <span className="text-gray-400 block text-sm">Retail Investor</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
} 
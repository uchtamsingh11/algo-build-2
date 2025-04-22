"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LineChart, BarChart3, UsersRound, Store, Code, Settings } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-black py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">Why Choose AlgoZ Trading</h2>
                    <p className="mt-4 text-gray-400">Advanced algorithmic trading solutions for modern traders and investors</p>
                </div>
                
                <Card className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x overflow-hidden shadow-zinc-900/20 text-center md:mt-16 bg-black border-gray-800">
                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <LineChart className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">TradingView</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-gray-400">Advanced charting and technical analysis integrated directly into our platform for optimal trading decisions.</p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <BarChart3 className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Scalping Tool</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-gray-400">Lightning-fast execution tools designed for scalpers to capture small price movements with minimal risk.</p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <UsersRound className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Copy Trading</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-gray-400">Follow and automatically copy the trades of successful investors to leverage their expertise while you learn.</p>
                        </CardContent>
                    </div>
                </Card>
                
                <Card className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x overflow-hidden shadow-zinc-900/20 text-center bg-black border-gray-800">
                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Store className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Marketplace</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-gray-400">Access a diverse ecosystem of trading algorithms, indicators, and strategies from our thriving community of developers.</p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Code className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Personalized Developer</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-gray-400">Get custom trading algorithms built specifically for your trading needs by our experienced development team.</p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-900/10 hover:bg-zinc-900/50 transition-colors duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings className="size-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Optimization</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-gray-400">Fine-tune your trading strategies with our powerful backtesting and optimization tools for maximum performance.</p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)25%,transparent)]">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div aria-hidden className="bg-radial to-black absolute inset-0 from-transparent to-75%" />
        <div className="bg-black absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-gray-800 group-hover:border-gray-700 transition-colors duration-300">{children}</div>
    </div>
)

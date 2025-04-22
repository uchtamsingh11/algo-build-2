"use client"

import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function LogoCloud() {
    return (
        <section className="bg-black overflow-hidden py-8">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:border-gray-800 md:pr-6">
                        <p className="text-end text-sm text-gray-400">Trusted by top trading firms</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            direction="horizontal"
                            speed={40}
                            speedOnHover={20}
                            gap={112}>
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    aliceblue
                                </span>
                            </div>

                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    anglebroking
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    dhanHQ
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    zerodha
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    fyers
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    upstox
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    Binance
                                </span>
                            </div>

                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    deltaexchange
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    Kotak
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    Flattrade
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    ICICI Direct
                                </span>
                            </div>
                            
                            <div className="flex">
                                <span className="mx-auto text-lg font-medium text-white opacity-70 hover:opacity-100 transition-opacity">
                                    IIFL
                                </span>
                            </div>
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-black absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-black absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

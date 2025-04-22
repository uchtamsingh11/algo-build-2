"use client"

import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from '@/components/logos'
import { LogoIcon } from '@/components/logo'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

export default function IntegrationsSection() {
    return (
        <section>
            <div className="bg-black py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="bg-zinc-900/25 group relative mx-auto max-w-[22rem] items-center justify-between space-y-6 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-md">
                        <div
                            role="presentation"
                            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"></div>
                        <div>
                            <InfiniteSlider
                                gap={24}
                                speed={20}
                                speedOnHover={5}
                                direction="horizontal">
                                <IntegrationCard>
                                    <VSCodium />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MediaWiki />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <GooglePaLM />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Gemini />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Replit />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MagicUI />
                                </IntegrationCard>
                            </InfiniteSlider>
                        </div>

                        <div>
                            <InfiniteSlider
                                gap={24}
                                speed={20}
                                speedOnHover={5}
                                direction="horizontal"
                                reverse>
                                <IntegrationCard>
                                    <Gemini />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Replit />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MediaWiki />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MagicUI />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <VSCodium />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <GooglePaLM />
                                </IntegrationCard>
                            </InfiniteSlider>
                        </div>
                        <div>
                            <InfiniteSlider
                                gap={24}
                                speed={20}
                                speedOnHover={5}
                                direction="horizontal">
                                <IntegrationCard>
                                    <Replit />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MagicUI />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Gemini />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <VSCodium />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <MediaWiki />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <GooglePaLM />
                                </IntegrationCard>
                            </InfiniteSlider>
                        </div>
                        <div className="absolute inset-0 m-auto flex size-fit justify-center gap-2">
                            <IntegrationCard
                                className="shadow-zinc-900/20 size-16 bg-black shadow-xl backdrop-blur-md backdrop-grayscale dark:border-white/10 dark:shadow-white/15"
                                isCenter={true}>
                                <LogoIcon />
                            </IntegrationCard>
                        </div>
                    </div>
                    <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl text-white">Integration Partners</h2>
                        <p className="text-gray-400">Connect AlgoZ seamlessly with your favorite trading platforms and financial services.</p>

                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-800 text-white hover:bg-zinc-900 hover:text-white"
                            asChild>
                            <Link href="#">Explore Integrations</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }: { children: React.ReactNode; className?: string; position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom'; isCenter?: boolean }) => {
    return (
        <div className={cn('bg-black relative z-20 flex size-12 rounded-full border border-gray-800', className)}>
            <div className={cn('m-auto size-fit *:size-5 *:text-white', isCenter && '*:size-8')}>{children}</div>
        </div>
    )
} 
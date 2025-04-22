import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/hero5-header'
import BackButton from '@/components/back-button'

export default function RefundPolicy() {
  return (
    <>
      <HeroHeader />
      <div className="bg-black min-h-screen">
        <BackButton />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Refund & Cancellation Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">General Information</h2>
              <p className="text-gray-300">
                At AlgoZ, we strive to provide top-quality algorithmic trading services. However, we understand that there may be instances where a refund or cancellation is necessary. This policy outlines the conditions and processes for refunds and cancellations of our services and purchases.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Z Coins and Subscription Purchases</h2>
              <p className="text-gray-300">
                All purchases of Z Coins and subscriptions on the AlgoZ platform are final. Due to the digital nature of our products and services, we generally do not offer refunds once a purchase has been completed, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Unauthorized or fraudulent charges that can be verified.</li>
                <li>Technical issues on our end that prevent you from accessing your purchased services for an extended period (exceeding 48 hours).</li>
                <li>Significant discrepancy between the service described and the service provided.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Refund Request Process</h2>
              <p className="text-gray-300">
                If you believe you qualify for a refund based on the circumstances mentioned above, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 mt-2 text-gray-300">
                <li>Contact our support team at admin@algoz.tech within 7 days of the purchase.</li>
                <li>Provide your account details, transaction information, and a detailed explanation of why you're requesting a refund.</li>
                <li>Our team will review your request and respond within 5 business days.</li>
                <li>If approved, refunds will be processed to the original method of payment within 7-14 business days, depending on your payment provider.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Subscription Cancellations</h2>
              <p className="text-gray-300">
                For users with recurring subscription plans:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>You may cancel your subscription at any time through your account settings.</li>
                <li>Cancellation will take effect at the end of your current billing cycle.</li>
                <li>No partial refunds will be issued for the unused portion of your current billing period.</li>
                <li>Access to premium features will continue until the end of your paid subscription period.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Special Considerations</h2>
              <p className="text-gray-300">
                <strong>Trading Results:</strong> We do not provide refunds based on dissatisfaction with trading results or market performance. Algorithmic trading involves inherent risks, and past performance is not indicative of future results.
              </p>
              <p className="text-gray-300 mt-4">
                <strong>Promotional Credits:</strong> Any promotional or complimentary credits provided by AlgoZ have no cash value and are not eligible for refunds.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-300">
                AlgoZ reserves the right to modify this Refund & Cancellation Policy at any time. Changes will be effective immediately upon posting to our website. It is your responsibility to review this policy periodically for changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about our Refund & Cancellation Policy, please contact us:
              </p>
              <ul className="mt-2 text-gray-300">
                <li><strong>Email:</strong> admin@algoz.tech</li>
                <li><strong>Phone:</strong> +91 9214740350</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-6 text-center">
            <Button asChild variant="outline" className="text-blue-400 hover:text-blue-300 border-blue-900 hover:border-blue-800">
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 
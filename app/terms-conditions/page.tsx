import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/hero5-header'
import BackButton from '@/components/back-button'

export default function TermsConditions() {
  return (
    <>
      <HeroHeader />
      <div className="bg-black min-h-screen">
        <BackButton />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <p className="text-gray-300">
                Welcome to AlgoZ. These Terms of Service ("Terms") govern your use of our algorithmic trading platform, website, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-300 mt-4">
                Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using our Services, you confirm that you accept these Terms and agree to comply with them. If you are using our Services on behalf of a business or other entity, you represent that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Changes to Terms</h2>
              <p className="text-gray-300">
                We may revise these Terms at any time by amending this page. Please check this page regularly to take notice of any changes, as they are binding on you. Your continued use of our Services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
              <p className="text-gray-300">
                To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-gray-300 mt-4">
                You are responsible for safeguarding your account credentials and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Services and Subscriptions</h2>
              <p className="text-gray-300">
                AlgoZ provides algorithmic trading tools and services that may include:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Access to trading algorithms and strategies</li>
                <li>Market data and analysis</li>
                <li>Educational resources and materials</li>
                <li>Trading signals and recommendations</li>
                <li>Account management features</li>
              </ul>
              <p className="text-gray-300 mt-4">
                We offer various subscription plans with different features and pricing. Detailed information about our subscription plans is available on our website. By signing up for a subscription, you agree to pay all fees associated with your selected plan.
              </p>
              <p className="text-gray-300 mt-4">
                For information about refunds and cancellations, please refer to our <Link href="/refund-policy" className="text-blue-400 hover:text-blue-300">Refund and Cancellation Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Z Coins and Virtual Currency</h2>
              <p className="text-gray-300">
                Our platform may use a virtual currency called "Z Coins" for certain transactions within the Services. Z Coins have no real-world monetary value and cannot be exchanged for cash or other value outside of our Services. The purchase and use of Z Coins are subject to our <Link href="/refund-policy" className="text-blue-400 hover:text-blue-300">Refund and Cancellation Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. User Conduct</h2>
              <p className="text-gray-300">
                When using our Services, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe the intellectual property rights of others</li>
                <li>Attempt to gain unauthorized access to any part of our Services</li>
                <li>Use our Services to transmit any harmful code or malware</li>
                <li>Interfere with the proper functioning of our Services</li>
                <li>Engage in any activity that could disable, overburden, or impair our Services</li>
                <li>Use automated systems, including "robots," "spiders," or "offline readers," to access our Services</li>
                <li>Share your account credentials with others or allow others to access your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Investment Risks and Disclaimer</h2>
              <p className="text-gray-300">
                Algorithmic trading and investing in financial markets involve substantial risk, including the potential loss of principal. Past performance is not indicative of future results.
              </p>
              <p className="text-gray-300 mt-4">
                Our Services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that our Services will be uninterrupted, secure, or error-free.
              </p>
              <p className="text-gray-300 mt-4">
                The information, tools, and materials provided through our Services are not intended as financial advice. You should consult with a qualified financial advisor before making any investment decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property Rights</h2>
              <p className="text-gray-300">
                All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the compilation thereof, are owned by AlgoZ, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-300 mt-4">
                You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit these restrictions or you have our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-300">
                To the maximum extent permitted by law, in no event shall AlgoZ, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, our Services, including any direct, indirect, special, incidental, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
              <p className="text-gray-300">
                You agree to defend, indemnify, and hold harmless AlgoZ, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law and Jurisdiction</h2>
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms, including any question regarding their existence, validity, or termination, shall be referred to and finally resolved by the courts of Jaipur, Rajasthan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">12. Termination</h2>
              <p className="text-gray-300">
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p className="text-gray-300 mt-4">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us:
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
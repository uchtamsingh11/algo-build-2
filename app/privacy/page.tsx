import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/hero5-header'
import BackButton from '@/components/back-button'

export default function PrivacyPolicy() {
  return (
    <>
      <HeroHeader />
      <div className="bg-black min-h-screen">
        <BackButton />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <p className="text-gray-300">
                At AlgoZ, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, process, and store your information when you use our algorithmic trading platform and services.
              </p>
              <p className="text-gray-300 mt-4">
                By using our services, you agree to the collection and use of your information in accordance with this policy. Please read this Privacy Policy carefully to understand our practices regarding your personal data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="text-gray-300">
                We collect several types of information for various purposes to provide and improve our services to you:
              </p>
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Personal Data</h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Identity Information: Name, username, profile picture</li>
                <li>Contact Information: Email address, phone number</li>
                <li>Financial Information: Payment details, transaction history</li>
                <li>Technical Information: IP address, browser type, device information</li>
                <li>Usage Data: How you interact with our platform, features used, trading activity</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Cookies and Tracking Data</h3>
              <p className="text-gray-300">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service. For more information, please see our <Link href="/cookies" className="text-blue-400 hover:text-blue-300">Cookies Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-300">
                We use the collected data for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our services</li>
                <li>To monitor the usage of our services</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To provide you with news, special offers, and general information about other goods, services, and events</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
              <p className="text-gray-300">
                The security of your data is important to us. We strive to use commercially acceptable means to protect your personal data, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <p className="text-gray-300">
                We will retain your personal data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Disclosure of Data</h2>
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Legal Requirements</h3>
              <p className="text-gray-300">
                We may disclose your personal data in the good faith belief that such action is necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of AlgoZ</li>
                <li>Prevent or investigate possible wrongdoing in connection with the service</li>
                <li>Protect the personal safety of users of the service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Service Providers</h3>
              <p className="text-gray-300">
                We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Data Protection Rights</h2>
              <p className="text-gray-300">
                You have the following data protection rights:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li><strong>Access:</strong> You can request copies of your personal data.</li>
                <li><strong>Rectification:</strong> You can request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>Erasure:</strong> You can request that we erase your personal data, under certain conditions.</li>
                <li><strong>Restriction:</strong> You can request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>Data Portability:</strong> You can request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="text-gray-300 mt-4">
                To exercise any of these rights, please contact us using the information in the "Contact Us" section.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p className="text-gray-300 mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us:
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
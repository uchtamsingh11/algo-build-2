import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/hero5-header'
import BackButton from '@/components/back-button'

export default function CookiesPolicy() {
  return (
    <>
      <HeroHeader />
      <div className="bg-black min-h-screen">
        <BackButton />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Cookies Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies</h2>
              <p className="text-gray-300">
                As is common practice with almost all professional websites, AlgoZ uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Cookies</h2>
              <p className="text-gray-300">
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">The Cookies We Set</h2>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>
                  <strong>Account related cookies</strong>
                  <p className="mt-1">If you create an account with us, we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, however in some cases they may remain afterward to remember your site preferences when logged out.</p>
                </li>
                <li className="mt-4">
                  <strong>Login related cookies</strong>
                  <p className="mt-1">We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
                </li>
                <li className="mt-4">
                  <strong>Forms related cookies</strong>
                  <p className="mt-1">When you submit data through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence.</p>
                </li>
                <li className="mt-4">
                  <strong>Site preferences cookies</strong>
                  <p className="mt-1">In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page that is affected by your preferences.</p>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-gray-300">
                In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
                <li className="mt-2">From time to time, we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features, these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimizations our users appreciate the most.</li>
                <li className="mt-2">We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites including Facebook, Twitter, and LinkedIn, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">More Information</h2>
              <p className="text-gray-300">
                Hopefully, that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
              <p className="text-gray-300 mt-4">
                However, if you are still looking for more information, you can contact us through one of our preferred contact methods:
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
import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - LSP"}>
       <div className="bg-[#bdd1ff40] min-h-[75vh] rounded-2xl p-4 flex flex-col m-20 gap-6">

        <h1 className='font-bold text-2xl my-3 block bg-white text-center p-3 rounded-2xl'>Privacy Policy</h1>
        <div className="bg-white w-full h-full rounded-2xl flex justify-start items-start flex-col gap-2 p-6">
        <p>Welcome to LSP. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website, make a purchase, or interact with our services.
          By using our website, you agree to the terms of this Privacy Policy. If you do not agree, please do not access or use our services.</p>
        <h3 className='font-bold text-xl my-1'>Information We Collect</h3>

        <p>We may collect the following types of information:</p>

        <h4 className='font-bold my-1'>Personal Information</h4>
        <ul className='my-1'>
          <li>Name</li>
          <li>Email address</li>
        </ul>

        <h4 className='font-bold my-1'>Non-Personal Information - Browser type and version</h4>
        <ul className='my-1'>
          <li>IP address</li>
          <li>Device information</li>
          <li>Cookies and tracking data (see "Cookies" section below)</li>
        </ul>

        <h4 className='font-bold my-1'>How We Collect Information</h4>
        <ul className='my-1'>
          <li>When you place an order</li>
          <li>When you create an account</li>
          <li>When you subscribe to our newsletter</li>
          <li>Through cookies and analytics tools</li>
          <li>When you contact customer support</li>
        </ul>

        <h3 className='font-bold text-xl my-1'>How We Use Your Information</h3>
        <p>We use your information for the following purposes,
          To process and fulfill your orders.
          To communicate with you (order updates, promotions, customer service).
          To improve our website and user experience.
          To prevent fraud and enhance security.
          To comply with legal obligations.</p>
        
        <h3 className='font-bold text-xl my-1'>Sharing Your Information</h3>
        <ul className='my-1'>
          <li>Third-party service providers (payment processors, shipping carriers, marketing agencies)</li>
          <li>Legal authorities if required by law (e.g., fraud prevention, court orders)</li>
          <li>Business partners (only with your consent for promotions)</li>
        </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
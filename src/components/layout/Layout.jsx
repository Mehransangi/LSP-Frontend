import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name='description' content={description} />
                    <meta name='keywords' content={keywords} />
                    <meta name='author' content={author} />
                    <title>{title}</title>
                </Helmet>
                <Header />
                <main className='flex-grow flex items-center justify-center'>
                    <Toaster />
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

Layout.defaultProps = {
    title: "LSP - Local Scholarship Portal",
    description: "LSP is the platform where you will find all the scholarships currently avalible in Pakistan.",
    keywords: "Scholarship, local-scholarship",
    author: "Mehran Sangi"
}

export default Layout
import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us - LSP"}>
      <div className='flex w-full'>
        <div className="w-full absolute bg-linearw h-200 "></div>
        <div className="z-50 w-full flex flex-col items-center">
          <h1 className='text-white font-bold text-2xl text-center mt-40 mb-20'>ABOUT US</h1>
          <img src="./Images/aboutus.png" alt="about us" className='w-200' />
          <div className=" flex flex-col gap-2 p-10 mx-100 mb-15 font-light">
            <h3 className='text-xl font-medium my-2'><strong>Our Story</strong></h3>
            <p>Hello! I’m <strong>Mehran Sangi</strong>, a passionate Software Engineering student in my final year, pursuing my degree in Pakistan. Over the past four years, my journey has been fueled by curiosity, a love for problem-solving, and a desire to use technology for meaningful impact. As part of my Final Year Project (FYP), I wanted to create something that went beyond just fulfilling academic requirements — I wanted to solve a real problem faced by thousands of students in my country.</p>
            <p>That’s how <strong>Local Scholarship Portal (LSP)</strong> was born.</p>
            <p>The idea came from observing the struggles of students — especially those from underprivileged backgrounds, remote areas, or with disabilities — in finding the right scholarships. Opportunities exist, but they are scattered across websites, hidden in PDFs, or announced in short-lived social media posts. The result? Many deserving students never even hear about them.</p>
            <p>I decided to change that.</p>
            <h3 className='text-xl font-medium my-2'><strong>Our Mission</strong></h3>
            <p>At <strong>LSP</strong>, our mission is simple yet powerful:</p>
            <blockquote>
            <p><strong>"To make every local scholarship in Pakistan easily discoverable, accessible, and understandable for all students, regardless of their background or abilities."</strong></p>
            </blockquote>
            <p>We believe that financial constraints should never be a barrier to education. Whether a student is applying for their first undergraduate program, pursuing a master’s degree, or looking for funding for specialized fields, LSP aims to be their one-stop solution.</p>
            <p></p>
            <h3 className='text-xl font-medium my-2'><strong>Why LSP is Different</strong></h3>
            <p>Most scholarship search platforms focus on international funding or generic opportunities. LSP is <strong>built for Pakistan</strong> — with local students, universities, and provincial schemes in mind.</p>
            <p>Here’s what makes us stand out:</p>
            <ul>
              <li><p><strong>Exclusive Local Focus</strong> – We list scholarships offered by Pakistani universities, government bodies, NGOs, and welfare organizations.</p></li>
              <li><p><strong>Special Quota Coverage</strong> – We highlight opportunities for disabled students, minorities, and underrepresented groups.</p></li>
              <li><p><strong>Structured, Filterable Data</strong> – Scholarships are not just listed; they are categorized by location, program level, category, and university.</p></li>
              <li><p><strong>Updated in Real-Time</strong> – Using scraping and manual verification, our database stays fresh and relevant.</p></li>
              <li><p><strong>Simple, User-Friendly Interface</strong> – Students don’t need to be tech-savvy to find what they need.</p></li>
              </ul>
              <p></p>
              <h3 className='text-xl font-medium my-2'><strong>The Technology Behind LSP</strong></h3>
              <p>Being a software engineer in training, I wanted LSP to be <strong>fast, scalable, and future-proof</strong>. That’s why I chose the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js) — a modern and powerful web development framework.</p>
              <p>Here’s a glimpse into the tech side:</p>
              <ul>
                <li><p><strong>MongoDB</strong> – Stores all scholarship data in a flexible, schema-based format.</p></li>
                <li><p><strong>Express.js</strong> – Handles backend API requests efficiently.</p></li>
                <li><p><strong>React.js</strong> – Powers the front-end for smooth, dynamic, and responsive user experiences.</p></li>
                <li><p><strong>Node.js</strong> – The backbone server environment ensuring scalability and performance.</p></li>
                </ul>
                <p><strong>Web Scraping &amp; Automation</strong> – Built-in tools ( CHEERIO ) to gather and update scholarship information from official sources.</p>
                <p>Special Thanks to <strong>EDUVISION &amp; HEC</strong> for providing us with information about the scholarship.</p>
                <p>EDUVISION : <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.eduvision.edu.pk/">https://www.eduvision.edu.pk/</a></p><p>HEC: <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.hec.gov.pk/english/Pages/default.aspx">https://www.hec.gov.pk/english/Pages/default.aspx</a></p>
                <p>This combination allows LSP to handle <strong>dynamic filters</strong>, search queries, and large amounts of data without slowing down — ensuring students can quickly find relevant opportunities.</p>
                <p></p>
                <h3 className='text-xl font-medium my-2'><strong>Our Key Features</strong></h3>
                <ul>
                  <li><p><strong>Advanced Search &amp; Filters</strong> – Find scholarships based on <strong>university</strong>, <strong>location</strong>, <strong>category</strong>, or <strong>program level</strong>.</p></li>
                  <li><p><strong>Detailed Scholarship Pages</strong> – Each listing comes with full eligibility criteria, deadlines, application links, and descriptions.</p></li>
                  <li><p><strong>Special Quota Highlights</strong> – Easily identify scholarships for <strong>disabled students</strong>, <strong>minorities</strong>, or <strong>special groups</strong>.</p></li>
                  <li><p><strong>Deadline Tracking</strong> – Never miss an opportunity again with visible and organized timelines.</p></li>
                  <li><p><strong>Clean, Mobile-Responsive Design</strong> – Works seamlessly on both computers and smartphones.</p></li>
                  </ul>
                  <p></p>
                  <h3 className='text-xl font-medium my-2'><strong>Our Impact</strong></h3><p>Although LSP started as my FYP, the vision is much bigger. The portal has the potential to:</p>
                  <ul>
                    <li><p>Help <strong>thousands of students</strong> discover financial aid they didn’t know existed.</p></li>
                    <li><p>Encourage <strong>inclusive education</strong> by promoting scholarships for disabled students and marginalized groups.</p></li>
                    <li><p>Reduce <strong>information inequality</strong> between urban and rural students.</p></li>
                    <li><p>Act as a <strong>central hub</strong> for all scholarship-related updates in Pakistan.</p></li>
                    </ul>
                    <p></p>
                    <h3 className='text-xl font-medium my-2'><strong>Challenges We Solved</strong></h3>
                    <p>Building LSP wasn’t just about coding. It required problem-solving on multiple fronts:</p>
                    <ul>
                      <li><p><strong>Data Accuracy</strong> – Many scholarships have outdated or conflicting information online. We built a process to cross-check and verify data before publishing.</p></li>
                      <li><p><strong>Standardization</strong> – Every scholarship source formats data differently. We created a consistent structure so users can easily compare opportunities.</p></li>
                      <li><p><strong>Accessibility</strong> – Considering students with disabilities, the portal follows simple, clear design principles with minimal distractions.</p></li>
                      <li><p><strong>Performance</strong> – With so many scholarships and filters, speed could have been a problem — but the MERN stack ensures smooth performance.</p></li>
                      </ul>
                      <p></p>
                      <h3 className='text-xl font-medium my-2'><strong>Looking Ahead</strong></h3><p>While the current version of LSP focuses on Pakistan, there’s room to grow:</p>
                      <ul>
                        <li><p><strong>Adding more provinces and cities</strong> for hyper-local results.</p></li>
                        <li><p><strong>Integrating AI-based recommendations</strong> to match students with best-fit scholarships.</p></li>
                        <li><p><strong>Launching a mobile app</strong> for even easier access.</p></li>
                        <li><p><strong>Building partnerships</strong> with universities and NGOs for exclusive listings.</p></li>
                        <li><p><strong>Creating awareness campaigns</strong> so no deserving student misses out.</p></li>
                      </ul>
                        <p></p>
                        <h3 className='text-xl font-medium my-2'><strong>Why This Matters to Me</strong></h3>
                        <p>I know firsthand what it’s like to navigate the maze of academic funding. Many of my peers struggled simply because they didn’t know where to look or how to apply. Seeing bright, capable students give up on their dreams due to financial constraints was heartbreaking.</p>
                        <blockquote>
                        <p><strong>"Education is the foundation of opportunity. If we can break down the financial barrier, we can unlock unlimited potential."</strong></p>
                        </blockquote>
                        <p>LSP isn’t just a project for me — it’s a mission. Even after I graduate, I want this platform to live on, helping generation after generation of Pakistani students.</p>
                        <p></p>
                        <p><strong>Local Scholarship Portal (LSP)</strong> — <em>Connecting ambition with opportunity.</em></p>
         </div>
        </div>
      </div>
    </Layout>
  )
}

export default About

      //  <div className=" min-h-[75vh] rounded-2xl p-4 flex flex-col my-12 gap-6 bg-lineart">
      //       <h1 className='text-2xl uppercase font-bold mb-2 bg-white text-center p-3 rounded-2xl'>About Us</h1>
      //     <div className="bg-white w-full h-full rounded-2xl flex justify-start items-start flex-col gap-2 p-6">
            
      //       {/* <h3 className='text-xl'><strong>Our Story</strong></h3><p>Hello! I’m <strong>Mehran Sangi</strong>, a passionate Software Engineering student in my final year, pursuing my degree in Pakistan. Over the past four years, my journey has been fueled by curiosity, a love for problem-solving, and a desire to use technology for meaningful impact. As part of my Final Year Project (FYP), I wanted to create something that went beyond just fulfilling academic requirements — I wanted to solve a real problem faced by thousands of students in my country.</p><p>That’s how <strong>Local Scholarship Portal (LSP)</strong> was born.</p><p>The idea came from observing the struggles of students — especially those from underprivileged backgrounds, remote areas, or with disabilities — in finding the right scholarships. Opportunities exist, but they are scattered across websites, hidden in PDFs, or announced in short-lived social media posts. The result? Many deserving students never even hear about them.</p><p>I decided to change that.</p><h3><strong>Our Mission</strong></h3><p>At <strong>LSP</strong>, our mission is simple yet powerful:</p><blockquote><p><strong>"To make every local scholarship in Pakistan easily discoverable, accessible, and understandable for all students, regardless of their background or abilities."</strong></p></blockquote><p>We believe that financial constraints should never be a barrier to education. Whether a student is applying for their first undergraduate program, pursuing a master’s degree, or looking for funding for specialized fields, LSP aims to be their one-stop solution.</p><p></p><h3><strong>Why LSP is Different</strong></h3><p>Most scholarship search platforms focus on international funding or generic opportunities. LSP is <strong>built for Pakistan</strong> — with local students, universities, and provincial schemes in mind.</p><p>Here’s what makes us stand out:</p><ul><li><p><strong>Exclusive Local Focus</strong> – We list scholarships offered by Pakistani universities, government bodies, NGOs, and welfare organizations.</p></li><li><p><strong>Special Quota Coverage</strong> – We highlight opportunities for disabled students, minorities, and underrepresented groups.</p></li><li><p><strong>Structured, Filterable Data</strong> – Scholarships are not just listed; they are categorized by location, program level, category, and university.</p></li><li><p><strong>Updated in Real-Time</strong> – Using scraping and manual verification, our database stays fresh and relevant.</p></li><li><p><strong>Simple, User-Friendly Interface</strong> – Students don’t need to be tech-savvy to find what they need.</p></li></ul><p></p><h3><strong>The Technology Behind LSP</strong></h3><p>Being a software engineer in training, I wanted LSP to be <strong>fast, scalable, and future-proof</strong>. That’s why I chose the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js) — a modern and powerful web development framework.</p><p>Here’s a glimpse into the tech side:</p><ul><li><p><strong>MongoDB</strong> – Stores all scholarship data in a flexible, schema-based format.</p></li><li><p><strong>Express.js</strong> – Handles backend API requests efficiently.</p></li><li><p><strong>React.js</strong> – Powers the front-end for smooth, dynamic, and responsive user experiences.</p></li><li><p><strong>Node.js</strong> – The backbone server environment ensuring scalability and performance.</p></li></ul><p><strong>Web Scraping &amp; Automation</strong> – Built-in tools ( CHEERIO ) to gather and update scholarship information from official sources.</p><p>Special Thanks to <strong>EDUVISION &amp; HEC</strong> for providing us with information about the scholarship.</p><p>EDUVISION : <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.eduvision.edu.pk/">https://www.eduvision.edu.pk/</a></p><p>HEC: <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.hec.gov.pk/english/Pages/default.aspx">https://www.hec.gov.pk/english/Pages/default.aspx</a></p><p>This combination allows LSP to handle <strong>dynamic filters</strong>, search queries, and large amounts of data without slowing down — ensuring students can quickly find relevant opportunities.</p><p></p><h3><strong>Our Key Features</strong></h3><ul><li><p><strong>Advanced Search &amp; Filters</strong> – Find scholarships based on <strong>university</strong>, <strong>location</strong>, <strong>category</strong>, or <strong>program level</strong>.</p></li><li><p><strong>Detailed Scholarship Pages</strong> – Each listing comes with full eligibility criteria, deadlines, application links, and descriptions.</p></li><li><p><strong>Special Quota Highlights</strong> – Easily identify scholarships for <strong>disabled students</strong>, <strong>minorities</strong>, or <strong>special groups</strong>.</p></li><li><p><strong>Deadline Tracking</strong> – Never miss an opportunity again with visible and organized timelines.</p></li><li><p><strong>Clean, Mobile-Responsive Design</strong> – Works seamlessly on both computers and smartphones.</p></li></ul><p></p><h3><strong>Our Impact</strong></h3><p>Although LSP started as my FYP, the vision is much bigger. The portal has the potential to:</p><ul><li><p>Help <strong>thousands of students</strong> discover financial aid they didn’t know existed.</p></li><li><p>Encourage <strong>inclusive education</strong> by promoting scholarships for disabled students and marginalized groups.</p></li><li><p>Reduce <strong>information inequality</strong> between urban and rural students.</p></li><li><p>Act as a <strong>central hub</strong> for all scholarship-related updates in Pakistan.</p></li></ul><p></p><h3><strong>Challenges We Solved</strong></h3><p>Building LSP wasn’t just about coding. It required problem-solving on multiple fronts:</p><ul><li><p><strong>Data Accuracy</strong> – Many scholarships have outdated or conflicting information online. We built a process to cross-check and verify data before publishing.</p></li><li><p><strong>Standardization</strong> – Every scholarship source formats data differently. We created a consistent structure so users can easily compare opportunities.</p></li><li><p><strong>Accessibility</strong> – Considering students with disabilities, the portal follows simple, clear design principles with minimal distractions.</p></li><li><p><strong>Performance</strong> – With so many scholarships and filters, speed could have been a problem — but the MERN stack ensures smooth performance.</p></li></ul><p></p><h3><strong>Looking Ahead</strong></h3><p>While the current version of LSP focuses on Pakistan, there’s room to grow:</p><ul><li><p><strong>Adding more provinces and cities</strong> for hyper-local results.</p></li><li><p><strong>Integrating AI-based recommendations</strong> to match students with best-fit scholarships.</p></li><li><p><strong>Launching a mobile app</strong> for even easier access.</p></li><li><p><strong>Building partnerships</strong> with universities and NGOs for exclusive listings.</p></li><li><p><strong>Creating awareness campaigns</strong> so no deserving student misses out.</p></li></ul><p></p><h3><strong>Why This Matters to Me</strong></h3><p>I know firsthand what it’s like to navigate the maze of academic funding. Many of my peers struggled simply because they didn’t know where to look or how to apply. Seeing bright, capable students give up on their dreams due to financial constraints was heartbreaking.</p><blockquote><p><strong>"Education is the foundation of opportunity. If we can break down the financial barrier, we can unlock unlimited potential."</strong></p></blockquote><p>LSP isn’t just a project for me — it’s a mission. Even after I graduate, I want this platform to live on, helping generation after generation of Pakistani students.</p><p></p><p><strong>Local Scholarship Portal (LSP)</strong> — <em>Connecting ambition with opportunity.</em></p> */}
      //     </div>
      //   </div>         
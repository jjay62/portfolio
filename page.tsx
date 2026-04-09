import React from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import PersonalAbout from '@/components/personalAbout'
import Knowledge from '@/components/knowledge'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
const page = () => {
  return (
    <>    
    <div className="">
    <Header />
    <Hero />
    <PersonalAbout />
    <Knowledge />
    <Projects />
    <Footer />
    </div>
    </>
    
  )
}

export default page
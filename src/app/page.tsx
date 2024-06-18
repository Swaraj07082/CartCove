import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import React from 'react'
import SVGAnimation from '@/components/SVGAnimation'
import SlideTextAnimation from '@/components/SlideTextAnimation'
import ShoeStock from '@/components/ShoeStock'

export default function page() {
  return (
   <>
   <Navbar />
<SVGAnimation/>
   <HeroSection/>
   <SlideTextAnimation/>
   <ShoeStock/>
   </>
  )
}

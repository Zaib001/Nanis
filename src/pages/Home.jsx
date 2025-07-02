import React from 'react'
import DashboardSection from '../components/DashboardSection'
import { PromptSection } from '../components/PromptSection'
import { ActivitySection } from '../components/ActivitySection'
import DashboardHeader from '../components/DashboardHeader'

const Home = () => {
  return (
    <>
     <DashboardHeader />
         <div className="w-[1229px] px-[50px] flex flex-col gap-[50px] mt-[50px]">
           <div className="w-[756px] flex flex-col gap-[32px] mx-auto">
             <PromptSection />
             <ActivitySection />
            
           </div>
         </div>
    </>
  )
}

export default Home

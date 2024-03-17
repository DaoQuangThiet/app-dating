import Header from '@/components/ui/Header'
import React from 'react'
import PartnerList from './PartnerList'

export default function MyPageComponent(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header backIcon={false} bordered={false} title="さがす" />
      <div className="flex w-full max-w-[480px] flex-col px-2 py-8 my-14 mx-auto">
        <PartnerList />
      </div>
    </div>
  )
}

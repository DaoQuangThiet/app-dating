"use client"
import Header from '@/components/ui/Header'
import NewPasswordForm from './NewPasswordForm'

// TODO: write storybook
export default function NewPassword(): JSX.Element {
  return (
    <>
      <Header title="パスワードリセット" bordered={false} backIcon={false}/>
      <div className="flex justify-center">
        <div className="overflow-visible justify-start opacity-100 self-center min-w-[280px] max-w-[280px] min-h-[280px] h-max w-[280px] mx-0 my-0 flex-col flex-nowrap flex">
          <h5 className="whitespace-pre-wrap overflow-visible text-[20px] font-bold text-[#019f42] leading-relaxed opacity-100 self-start min-w-full max-w-full order-1 min-h-11 h-max w-full mx-0 my-0 z-10 relative break-words">
            パスワードをお忘れの方
          </h5>
          <NewPasswordForm />
        </div>
      </div>
    </>
  )
}

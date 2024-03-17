'use client'

import { Button } from '@/components/ui'
import { useDeactiveStore } from '../stores/deactive-store'

//TODO: Write storybook
export default function StepOne(): JSX.Element {
  const onSubmit = (): void => {
    useDeactiveStore.set.nextStep()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-body-m/medium text-primary-green">
        簡単なアンケートにご協力ください。
      </div>
      <div>
        <div>まだ退会は完了していません。</div>
        <div>アンケート回答後に退会手続きに進みます。</div>
      </div>
      <Button type="primary" onClick={onSubmit} className="!h-[50px]">
        アンケートに回答する
      </Button>
    </div>
  )
}

import RadioNotSelect from '@/components/icons/RadioNotSelect'
import RadioSelected from '@/components/icons/RadioSelected'
import { actions, useStore } from '@/stores'
import { plan30, plan90, plan90wLikeCommit, plan150 } from '../types'

export const plans = [
  {
    id: 'PLAN_30',
    title: '毎月払い',
    price: '4,500',
    detail: (): JSX.Element => (
      <>
        <strong className="text-primary-dark-green">4,500円</strong>/月、30日間
      </>
    ),
    description: () => '毎月払いのプランです。',
    orderItem: plan30,
  },
  {
    id: 'PLAN_90',
    title: '3ヶ月毎払い',
    price: '10,000',
    detail: (): JSX.Element => (
      <>
        (<strong className="text-primary-dark-green">3,333円</strong>
        /月、90日間)
      </>
    ),
    description: (): JSX.Element => (
      <>
        <div>おすすめの基本プラン。</div>
        <span className="text-red">半数以上の方</span>がこちらに入会しています。
      </>
    ),
    orderItem: plan90,
  },
  {
    id: 'PLAN_90WLIKECOMMIT',
    title: '3ヶ月毎払い',
    price: '15,000',
    detail: (): JSX.Element => (
      <>
        (<strong className="text-primary-dark-green">5,000円</strong>
        /月、90日間)
      </>
    ),
    description: () =>
      'AIのサポートで、おすすめに出てくる数を増やします。２番目に人気のプラン。期間内にもらったいいね！数が17個未満だった場合、次の９０日が無料。',
    orderItem: plan90wLikeCommit,
  },
  {
    id: 'PLAN_150',
    title: '5ヶ月毎払い',
    price: '15,000',
    detail: (): JSX.Element => (
      <>
        (<strong className="text-primary-dark-green">3,000円</strong>
        /月、150日間)
      </>
    ),
    description: () => 'じっくりと関係構築を進めたいあなたに。',
    orderItem: plan150,
  },
]

export default function ListPlans(): JSX.Element {
  const selectedPlan = useStore().payment.plan()
  const selectPlan = actions.payment.plan

  return (
    <>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`bg-white flex flex-col divide-solid border-2 ${
            selectedPlan.id === plan.id ? 'border-blue' : 'border-sub-4'
          } cursor-pointer mb-5 rounded-2xl`}
          onClick={() => selectPlan(plan.orderItem)}
        >
          <div className="p-4 flex flex-col rounded-2xl">
            <div className="top-radio flex flex-row pb-2 mb-2 self-center w-full divide-solid border-b border-sub-4">
              <div className="flex flex-row w-1/2 items-center">
                <div className="image-select w-4 h-4">
                  {selectedPlan.id === plan.id ? (
                    <RadioSelected />
                  ) : (
                    <RadioNotSelect />
                  )}
                </div>
                <div className="text-sm font-bold ml-3 text-cetacean-blue">
                  {plan.title}
                  {plan.id === 'threeMonths' && (
                    <div className="text-xs font-bold text-cetacean-blue">
                      いいね！数保証付き
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="text-lg font-bold text-black-2nd flex">
                  {plan.price} <p className="text-xs self-end">円</p>
                </div>

                <div className="flex text-sm font-bold text-black-2nd mb-3">
                  {plan.detail()}
                </div>

                {plan.id === 'PLAN_90' && (
                  <div className="bg-red w-[150px] h-6 text-xs font-bold mb-3 rounded-full text-white flex justify-center items-center">
                    1,167円 / 月OFF!!
                  </div>
                )}
                {plan.id === 'PLAN_150' && (
                  <div className="bg-red w-[150px] h-6 text-xs font-bold mb-3 rounded-full text-white flex justify-center items-center">
                    1,500円 / 月OFF!!
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs py-1 pl-4 text-cetacean-blue">
              {plan.description()}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

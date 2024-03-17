'use client'

import HobbyTag from '@/features/recommend-feature/components/MyPageSingleComponent/HobbyTag'
import recommendedMemberFullDetail from '@/features/recommend-feature/configs/recommendedMemberFullDetail'
import { Detail, Profile } from '@/types/profile'
import Image from 'next/image'

type Props = {
  targetProfile: Profile | null
  getProfileFields: (attributeList: Detail[]) => Detail[]
}

export default function ProfileConfirm({
  targetProfile,
  getProfileFields,
}: Props): JSX.Element {
  return (
    <div className="h-[300px] overflow-y-auto bg-[#fafafa] p-[10px]">
      <Image
        loader={() => targetProfile?.main_photo_url || ''}
        src={targetProfile?.main_photo_url || ''}
        alt="recommend-user-image"
        width={0}
        height={0}
        style={{
          width: '240px',
          height: 'auto',
        }}
        unoptimized
        className="rounded-xl mx-auto my-4"
      />

      <div className="flex gap-1 h-20">
        {targetProfile?.sub_photos_url?.map((item) => (
          <Image
            key={item}
            loader={() => item}
            src={item}
            alt="recommend-user-sub-image"
            width={0}
            height={0}
            style={{
              width: 'auto',
              height: '80px',
            }}
            unoptimized
            className="rounded-md"
          />
        ))}
      </div>
      <div className="my-[10px]">
        <h4 className="text-[25px] leading-[1.4] font-bold">
          {targetProfile?.nickname}
        </h4>
      </div>
      <div className="text-[18px] leading-[1.4] text-[#909090] font-bold">
        プロフィール
      </div>

      {/* container for group of short description */}
      <div className="grid gap-5 my-[10px]">
        <div className="p-[10px] bg-white rounded-[10px]">
          <div className="pb-[10px] text-[14px] font-bold leading-[1] text-[#091747]">
            ひとこと
          </div>
          <div className="text-[14px] leading-[1.4] text-[#091747]">
            {targetProfile?.introduction_summary}
          </div>
        </div>
        <div className="p-[10px] bg-white rounded-[10px]">
          <div className="pb-[10px] text-[14px] font-bold leading-[1] text-[#091747]">
            マッチしたい相手
          </div>
          {/* container for group of relationships people looking for */}
          <div className="grid my-[10px]">
            {targetProfile?.search_targets.map((item) => (
              <div
                key={item}
                className="text-[14px] leading-[1.4] text-[#091747] py-[5px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* container for group of hobby */}
        <div className="bg-white p-[10px] rounded-[10px]">
          <div className="pb-[10px] text-[14px] font-bold leading-[1] text-[#091747]">
            コミュニティ
          </div>
          <div className="flex flex-wrap">
            {targetProfile?.hobbies?.map((item) => (
              <HobbyTag key={item} text={item} />
            ))}
          </div>
        </div>
        {/* container for self describe for partner or opposite sex friend */}
        <div className="bg-white p-[10px] rounded-[10px]">
          <div className="pb-[10px] text-[14px] font-bold leading-[1] text-[#091747]">
            自己紹介（異性向け）
          </div>
          <div className="text-[14px] leading-[1.4] text-[#091747]">
            {targetProfile?.introduction_for_partner_or_opposite_sex_friend}
          </div>
        </div>
      </div>

      {/* container for user status */}
      <div className="flex flex-col bg-white rounded-[10px] p-[10px]">
        {/* label */}
        <div className="text-[14px] font-bold leading-[1] text-[#091747] pb-[10px]">
          ステータス
        </div>
        <div className="text-[14px] leading-[14px] text-[#909090] py-[10px]">
          基本情報
        </div>

        {getProfileFields(recommendedMemberFullDetail).map((item) => (
          <div
            key={item.key}
            className="grid grid-cols-[40%_60%] min-h-10 my-[10px] items-center"
          >
            <div className="text-[14px] leading-[14px] font-bold text-[#019f42]">
              {item.label}
            </div>
            <div className="text-[14px] leading-5 text-[#091747]">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

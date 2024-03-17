import { getPersonAge } from '@/libs/utils'
import {
  childrenJP,
  cigaretteJP,
  Detail,
  educationBackgrounJP,
  gambleJP,
  genderJP,
  householdJP,
  maritalStatusJP,
  physiqueJP,
  Profile,
  religonJP,
  residenceJP,
} from '@/types/profile'
import { create } from 'zustand'

type State = {
  partnerSearch: Profile[]
  selectedPartner: Profile | null
}

type Action = {
  setPartnerSearch: (partnerSearch: Profile[]) => void
  setSelectedPartner: (selectedPartner: Profile | null) => void
  getSelectedPartner: (attributeList: Detail[]) => Detail[]
}

const getUserAttributes = (
  field: string,
  value: string | string[] | number | boolean | null | undefined,
  isList: boolean,
): string => {
  if (field === 'height' && value) return `${value}cm`

  if (field === 'age' && value && typeof value === 'string')
    return `${getPersonAge(value)}才`

  if (isList && value && Array.isArray(value) && value.length) {
    return value.join(', ')
  }

  if (!isList && value && typeof value === 'string') {
    return value
  }

  return '未設定'
}

export const usePartnerSearchStore = create<State & Action>()((set, get) => ({
  partnerSearch: [],
  selectedPartner: null,
  setPartnerSearch: (partnerSearch): void => set(() => ({ partnerSearch })),
  setSelectedPartner: (selectedPartner): void =>
    set(() => ({ selectedPartner })),
  getSelectedPartner: (attributeList): Detail[] => {
    const details = get().selectedPartner

    const convertedValue = details && {
      ...details,
      gender: details?.gender ? genderJP[details.gender] : null,
      physique: details?.physique ? physiqueJP[details.physique] : null,
      marital_status: details?.marital_status
        ? maritalStatusJP[details.marital_status]
        : null,
      children: details?.children ? childrenJP[details.children] : null,
      household: details?.household ? householdJP[details.household] : null,
      residence: details?.residence ? residenceJP[details.residence] : null,
      religion: details?.religion ? religonJP[details.religion] : null,
      cigarette: details?.cigarette ? cigaretteJP[details.cigarette] : null,
      gamble: details?.gamble ? gambleJP[details.gamble] : null,
      educational_background: details?.educational_background
        ? educationBackgrounJP[details.educational_background]
        : null,
    }

    return convertedValue
      ? attributeList?.map((item) => ({
          ...item,
          value: getUserAttributes(
            item.key,
            convertedValue[<keyof Profile>item.valueKey],
            item.isList,
          ),
        }))
      : []
  },
}))

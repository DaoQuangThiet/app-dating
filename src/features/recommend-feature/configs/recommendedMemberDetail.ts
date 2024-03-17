import { Detail } from '@/types/profile'

const recommendedMemberDetail: Detail[] = [
  {
    key: 'height',
    label: '身長',
    valueKey: 'height',
    isList: false,
  },
  {
    key: 'income',
    label: '年収',
    valueKey: 'income',
    isList: false,
  },
  {
    key: 'cigarette',
    label: 'タバコ',
    valueKey: 'cigarette',
    isList: false,
  },
  {
    key: 'gamble',
    label: 'ギャンブル',
    valueKey: 'gamble',
    isList: false,
  },
  {
    key: 'search_targets',
    label: '探し相手',
    valueKey: 'search_targets',
    isList: true,
  },
  {
    key: 'characters',
    label: '性格タイプ',
    valueKey: 'characters',
    isList: true,
  },
]

export default recommendedMemberDetail

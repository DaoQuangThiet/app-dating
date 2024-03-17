import { Detail } from '@/types/profile'

const recommendedMemberFullDetail: Detail[] = [
  {
    key: 'prefecture',
    label: '住まい',
    valueKey: 'prefecture',
    isList: false,
  },
  {
    key: 'place_of_birth',
    label: '出生地',
    valueKey: 'place_of_birth',
    isList: false,
  },
  {
    key: 'age',
    label: '年齢',
    valueKey: 'date_of_birth',
    isList: false,
  },
  {
    key: 'date_of_birth',
    label: '生年月日',
    valueKey: 'date_of_birth',
    isList: false,
  },
  {
    key: 'gender',
    label: '性別',
    valueKey: 'gender',
    isList: false,
  },
  {
    key: 'characters',
    label: '性格タイプ',
    valueKey: 'characters',
    isList: true,
  },
  {
    key: 'physique',
    label: '体格',
    valueKey: 'physique',
    isList: false,
  },
  {
    key: 'height',
    label: '身長',
    valueKey: 'height',
    isList: false,
  },
  {
    key: 'marital_status',
    label: '結婚歴',
    valueKey: 'marital_status',
    isList: false,
  },
  {
    key: 'children',
    label: '子供有無',
    valueKey: 'children',
    isList: false,
  },
  {
    key: 'household',
    label: '生活',
    valueKey: 'household',
    isList: false,
  },
  {
    key: 'residence',
    label: '住居',
    valueKey: 'residence',
    isList: false,
  },
  {
    key: 'cars',
    label: '車',
    valueKey: 'cars',
    isList: true,
  },
  {
    key: 'languages',
    label: '話せる言語',
    valueKey: 'languages',
    isList: true,
  },
  {
    key: 'religion',
    label: '宗教',
    valueKey: 'religion',
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
    key: 'income',
    label: '年収',
    valueKey: 'income',
    isList: false,
  },
  {
    key: 'educational_background',
    label: '学歴',
    valueKey: 'educational_background',
    isList: false,
  },
  {
    key: 'school_name',
    label: '学校名',
    valueKey: 'school_name',
    isList: false,
  },
  {
    key: 'business',
    label: '職業',
    valueKey: 'business',
    isList: false,
  },
]

export default recommendedMemberFullDetail

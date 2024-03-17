export type Detail = {
  key: string
  label: string
  valueKey: string
  isList: boolean
  value?: string
}

export const physiqueJP: { [key: string]: string } = {
  CHUBBY: 'ぽっちゃり',
  USUALLY: '普通',
  GLAMOR: '細身/スリム',
  SLENDER_SLIM: 'スポーツ',
  SPORTS: 'グラマー',
  THICK: '太め',
}
export const maritalStatusJP: { [key: string]: string } = {
  DIVORCED: '既婚',
  MARRIED: '離婚',
  UNMARRIED: '未婚',
  BEREAVEMENT: '死別',
}
export const childrenJP: { [key: string]: string } = {
  TOGETHER: 'いません',
  NO_CHILDREN: '同居しています',
  DIFFERENT_HOUSEHOLD: '別世帯です',
}
export const householdJP: { [key: string]: string } = {
  WITH_PARENTS: '一人暮らし',
  ALONE: '親と同居',
  WITH_SIBLINGS: '子供と同居',
  WITH_CHILD: '親と子供と同居',
  WITH_PARENTS_AND_CHILDREN: '兄弟と同居',
  WITH_FRIENDS: '友達と同居',
}
export const residenceJP: { [key: string]: string } = {
  RENTAL_HOUSE: '持家戸建て',
  OWNER_OCCUPIED_HOUSE: '持家マンション',
  OWNER_OCCUPIED_APARTMENT: '賃貸戸建て',
  RENTAL_APARTMENT: '賃貸マンション',
}
export const religonJP: { [key: string]: string } = {
  NO_RELIGION: '無宗教',
  SHINTO: '神道',
  BUDDHISM: '仏教',
  CHRISTIANITY: 'キリスト教',
  OTHERS: 'その他',
}
export const cigaretteJP: { [key: string]: string } = {
  SMOKING: '喫煙',
  DO_NOT: '吸わない',
  SOMETIMES: '時々',
}
export const gambleJP: { [key: string]: string } = {
  DO: 'する',
  DO_NOT: 'しない',
  SOMETIMES: '時々',
}
export const educationBackgrounJP: { [key: string]: string } = {
  PhD: '大学院修了／博士号',
  MASTER: '大学院修了／修士号',
  BACHELOR: '四年制大学卒業／学士号',
  JUNIOR_COLLEGE: '短期大学卒業',
  VOCATIONAL_SCHOOL: '専門学校卒業',
  HIGH_SCHOOL: '高校卒業',
  HIGH_SCHOOL_DROPOUT: '高校中退',
  JUNIOR_HIGH_SCHOOL: '中学校卒業',
}
export const genderJP: { [key: string]: string } = {
  MALE: '男性',
  FEMALE: '女性',
}

export type Profile = {
  user_id: string
  nickname: string
  physique: string | null
  marital_status: string | null
  main_photo: string
  main_photo_url: string
  languages: string[]
  place_of_birth: string | null
  prefecture: string | null
  religion: string | null
  residence: string | null
  retired: boolean | null
  school_name: string | null
  search_targets: string[]
  introduction_summary: string | null
  introduction_for_same_sex_friend: string | null
  introduction_for_partner_or_opposite_sex_friend: string | null
  income: string | null
  household: string | null
  hobbies: string[]
  height: number | null
  gender: string | null
  gamble: string | null
  educational_background: string | null
  date_of_birth: string
  cigarette: string | null
  children: string | null
  characters: string[]
  cars: string[]
  business: string | null
  sub_photos: string[]
  sub_photos_url: string[]
  is_online: boolean
  is_liked: boolean
  age: number
}

export type ProfileWithMessage = Profile & {
  id: string | null
  message: string | null
  has_message: string | null
  show_message: string | null
}

export type UserProfile = {
  display_email: string | null
  email: string
  id: string
  nickname: string
  identity_verification_status: string
  identity_verified: boolean
  onboarding_completed: boolean
  phone_number: string | null
  profile_level: string | null
  status: string
  terms_agreed: boolean
  thumbnail: string
  user_type: string
  gender: string
  created_at: string
}

export type ProfileFormValues = {
  nickname: string | null
  introduction_summary: string | null
  search_targets: string[]
  hobbies: string[]
  introduction_for_partner_or_opposite_sex_friend: string | null
  introduction_for_same_sex_friend: string | null
  prefecture: string | null
  place_of_birth: string | null
  date_of_birth: string | null
  characters: string[]
  physique: string | null
  height: number | null
  marital_status: string | null
  children: string | null
  household: string | null
  residence: string | null
  cars: string[]
  languages: string[]
  religion: string | null
  cigarette: string | null
  gamble: string | null
  income: string | null
  educational_background: string | null
  school_name: string | null
  business: string | null
  retired: boolean | null
}

export enum UserType {
  PREMIUM = 'PREMIUM',
  DEFAULT = 'DEFAULT',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}


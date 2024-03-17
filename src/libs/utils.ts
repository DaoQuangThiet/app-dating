import dayjs from 'dayjs'

export const getPersonAge = (date_of_birth: string): number => {
  const now = dayjs()
  const dob = dayjs(date_of_birth)
  const age = now.diff(dob, 'year')
  return age
}

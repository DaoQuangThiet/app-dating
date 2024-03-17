'use client'
import {
  useCreateUploadUrlApi,
  useGetBusinessesApi,
  useGetCarsApi,
  useGetCharactersApi,
  useGetHobbiesApi,
  useGetIncomesApi,
  useGetLanguagesApi,
  useGetPrefectureApi,
  useGetProfileApi,
  useGetSearchTargetApi,
  useUpdateProfileApi,
} from '@/api'
import { Button } from '@/components/ui'
import { Profile, ProfileFormValues } from '@/types/profile'
import {
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  UploadProps,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TipsUploadImage from './TipsUploadImage'

//TODO: Write story book
export default function ProfileEdit(): JSX.Element {
  const [preview, setPreview] = useState('')
  const [listPreview, setListPreview] = useState<string[]>([])
  const [listFile, setListFile] = useState<RcFile[]>([])
  const [mainphoto, setMainphoto] = useState('')
  const [showTips, setShowTips] = useState(false)

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [form] = Form.useForm()
  const router = useRouter()
  const [subPhotoUrl, setSubPhotoUrl] = useState<string[]>([])
  const dateFormatList = 'YYYY/MM/DD'

  const disabledDate = (
    current: string | number | dayjs.Dayjs | Date | null | undefined,
  ): boolean => {
    const today = dayjs()
    const ageLimit = 18
    return (
      (current && dayjs(current).add(ageLimit, 'year').isAfter(today)) ||
      dayjs(current).isAfter(today.endOf('day'))
    )
  }

  const { data: profileData } = useGetProfileApi()
  const { data: hobbiesData } = useGetHobbiesApi()
  const { data: searchTarget } = useGetSearchTargetApi()
  const { data: prefecturesData } = useGetPrefectureApi()
  const { data: characterData } = useGetCharactersApi()
  const { data: carData } = useGetCarsApi()
  const { data: languagesData } = useGetLanguagesApi()
  const { data: incomeData } = useGetIncomesApi()
  const { data: businessesData } = useGetBusinessesApi()

  const onChangeCheckbox = (): void => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    const isFetchedAll =
      profileData &&
      hobbiesData &&
      searchTarget &&
      prefecturesData &&
      characterData &&
      carData &&
      languagesData &&
      incomeData &&
      businessesData
    if (isFetchedAll) {
      setListPreview(profileData.sub_photos_url)
      setSubPhotoUrl(profileData.sub_photos)
      const formValues: Profile = profileData
      if (formValues.hobbies.length) {
        formValues.hobbies = formValues.hobbies.map(
          (item) =>
            hobbiesData.edges.find(
              (hobby: { name: string }) => hobby.name === item,
            )?.id || '',
        )
      }
      if (formValues.search_targets.length) {
        formValues.search_targets = formValues.search_targets.map(
          (item) =>
            searchTarget.edges.find(
              (target: { name: string }) => target.name === item,
            )?.id || '',
        )
      }
      if (formValues.prefecture) {
        formValues.prefecture =
          prefecturesData.edges.find(
            (prefecture: { name: string | null }) =>
              prefecture.name === formValues.prefecture,
          )?.id || ''
      }
      if (formValues.retired) {
        setIsChecked(true)
      }
      if (formValues.place_of_birth) {
        formValues.place_of_birth =
          prefecturesData.edges.find(
            (prefecture: { name: string | null }) =>
              prefecture.name === formValues.place_of_birth,
          )?.id || ''
      }
      if (formValues.characters.length) {
        formValues.characters = formValues.characters.map(
          (item) =>
            characterData.edges.find(
              (character: { name: string }) => character.name === item,
            )?.id || '',
        )
      }
      if (formValues.cars.length) {
        formValues.cars = formValues.cars.map(
          (item) =>
            carData.edges.find((car: { name: string }) => car.name === item)
              ?.id || '',
        )
      }
      if (formValues.languages.length) {
        formValues.languages = formValues.languages.map(
          (item) =>
            languagesData.edges.find(
              (language: { name: string }) => language.name === item,
            )?.id || '',
        )
      }
      if (formValues.income) {
        formValues.income =
          incomeData.edges.find(
            (income: { name: string | null }) =>
              income.name === formValues.income,
          )?.id || ''
      }
      if (formValues.business) {
        formValues.business =
          businessesData.edges.find(
            (business: { name: string | null }) =>
              business.name === formValues.business,
          )?.id || ''
      }
      form.setFieldsValue({
        ...formValues,
        date_of_birth: dayjs(formValues.date_of_birth),
      })
    }
  }, [
    businessesData,
    carData,
    characterData,
    form,
    hobbiesData,
    incomeData,
    languagesData,
    prefecturesData,
    profileData,
    searchTarget,
    setListPreview,
  ])

  const { mutateAsync } = useCreateUploadUrlApi()

  const avatarUploadProps: UploadProps = {
    accept: 'image/png, image/jpeg',
    beforeUpload: async (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        alert('JPG/PNGファイルのみアップロード可能です。')
        return false
      }
      setPreview(URL.createObjectURL(file))
      const fileName = file.name
      const fileExtension = fileName.split('.').pop()
      const filePath = fileName.split('.').slice(0, -1).join('.')
      const pathfile = 'avatar/' + filePath
      const dataBody = {
        file_path: pathfile,
        file_extension: fileExtension,
      }
      const dataUpload = await mutateAsync(dataBody)
      setMainphoto(dataUpload.file_name)

      const urlS3 = dataUpload.upload_url
      axios.put(urlS3, file)
      return false
    },
    maxCount: 1,
    showUploadList: false,
  }

  const imageUploadProps: UploadProps = {
    accept: 'image/png, image/jpeg',
    beforeUpload: async (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        alert('JPG/PNGファイルのみアップロード可能です。')
        return false
      }

      setListPreview([...listPreview, URL.createObjectURL(file)])
      setListFile([...listFile, file])

      const fileName = file.name
      const fileExtension = fileName.split('.').pop()
      const filePath = fileName.split('.').slice(0, -1).join('.')
      const dataBody = {
        file_path: filePath,
        file_extension: fileExtension,
      }
      await mutateAsync(dataBody).then((res) => {
        setSubPhotoUrl((prev) => [...prev, res.file_name])
        axios.put(res.upload_url, file)
      })

      return false
    },
    maxCount: 1,
    showUploadList: false,
  }

  const editProfile = useUpdateProfileApi()

  const onFinish = (values: ProfileFormValues): void => {
    const patchData = {
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format(dateFormatList),
      prefecture_id: values.prefecture,
      search_target_ids: values.search_targets,
      character_ids: values.characters,
      residence: values.residence || null,
      household: values.household || null,
      cigarette: values.cigarette || null,
      gamble: values.gamble || null,
      religion: values.religion || null,
      marital_status: values.marital_status || null,
      children: values.children || null,
      physique: values.physique || null,
      educational_background: values.educational_background || null,
      retired: isChecked,
      gender: profileData?.gender || '',
      introduction_for_partner_or_opposite_sex_friend:
        values.introduction_for_partner_or_opposite_sex_friend,
      introduction_for_same_sex_friend: values.introduction_for_same_sex_friend,
      height: Number(values.height) || null,
      main_photo: mainphoto || profileData?.main_photo || '',
      car_ids: values.cars,
      hobby_ids: values.hobbies,
      language_ids: values.languages,
      income_id: values.income,
      business_id: values.business,
      place_of_birth_id: values.place_of_birth,
      sub_photos: subPhotoUrl,
    }

    editProfile.mutate(patchData, {
      onSuccess: () => {
        router.push('/profile')
      },
      onError: () => {
        alert('情報を編集できません。もう一度お試しください。')
      },
    })
  }

  const handleShowTip = (): void => {
    setShowTips(!showTips)
  }

  if (showTips) return <TipsUploadImage onClick={handleShowTip} />

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-base w-full p-3 self-center flex flex-col">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item className="flex justify-center">
              <Upload
                {...avatarUploadProps}
                className="self-center flex flex-row cursor-pointer"
              >
                <div className="w-60 h-60 my-4 divide-solid border border-slate-300 flex rounded-lg hover:border-primary-green relative">
                  {profileData?.main_photo_url && (
                    <Image
                      loader={() => preview || profileData.main_photo_url}
                      src={preview || profileData.main_photo_url}
                      fill
                      alt="avatar"
                      className="object-contain rounded-lg"
                      unoptimized
                      priority
                    />
                  )}
                </div>
              </Upload>
            </Form.Item>

            <div className="flex gap-1 flex-nowrap overflow-y-auto">
              {listPreview.map((item, index) => (
                <div key={item} className="flex w-20 h-20 relative flex-none">
                  <Image
                    loader={() => item}
                    src={item}
                    width={80}
                    height={80}
                    alt="Avatar Default"
                    className="rounded object-cover"
                  />
                  {/* TODO: fix X button using svg icon, create handleonclick outside */}
                  <div
                    className="absolute bottom-1 right-1 cursor-pointer text-white"
                    onClick={() => {
                      setListFile(listFile.filter((_, i) => i !== index))
                      setListPreview(listPreview.filter((_, i) => i !== index))
                      setSubPhotoUrl((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }}
                  >
                    X
                  </div>
                </div>
              ))}
              <Upload
                {...imageUploadProps}
                className="flex flex-row cursor-pointer my-1 mr-1"
              >
                <div className="flex w-20 h-20 relative">
                  <Image
                    src="/avatar_default.svg"
                    fill
                    alt="Avatar Default"
                    className="rounded"
                  />
                </div>
              </Upload>
            </div>

            <div className="flex flex-row my-3">
              <Button
                className="mt-3 w-full !text-sm !h-12 !flex justify-center items-center"
                onClick={handleShowTip}
              >
                <Image
                  src="/contact_icon_green.svg"
                  width={16}
                  height={22}
                  alt="edit icon"
                  className="mr-1"
                />
                マッチしやすい写真のコツ
              </Button>
            </div>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                name="nickname"
                label={<label className="font-bold">ニックネーム</label>}
                rules={[
                  {
                    required: true,
                    message: '入力してください',
                  },
                ]}
              >
                <Input
                  placeholder="ニックネームを入力"
                  className="!bg-ghost-white text-sm"
                  maxLength={8}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                label={<label className="font-bold">ひとこと</label>}
                name="introduction_summary"
                rules={[
                  {
                    required: true,
                    message: '入力してください',
                  },
                ]}
              >
                <Input className="!bg-ghost-white text-sm" />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                name="search_targets"
                label={<label className="font-bold">マッチしたい相手</label>}
                rules={[
                  {
                    required: true,
                    message: '選んでください',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="未設定"
                  options={searchTarget?.edges?.map(
                    (items: { id: string; name: string }) => ({
                      value: items.id,
                      label: items.name,
                    }),
                  )}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                name="hobbies"
                label={<label className="font-bold">趣味</label>}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="未設定"
                  options={hobbiesData?.edges?.map(
                    (items: { id: string; name: string }) => ({
                      value: items.id,
                      label: items.name,
                    }),
                  )}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                name="introduction_for_partner_or_opposite_sex_friend"
                label={
                  <label className="font-bold">自己紹介（異性向け）</label>
                }
              >
                <Input.TextArea
                  className="text-cetacean-blue"
                  placeholder="入力してください"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3 shadow-lg"
            >
              <Form.Item
                name="introduction_for_same_sex_friend"
                label={
                  <label className="font-bold">自己紹介（同性向け）</label>
                }
              >
                <Input.TextArea
                  className="text-cetacean-blue"
                  placeholder="入力してください"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              className="flex flex-col justify-center w-full !my-3"
            >
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col flex-grow justify-start">
                  <div className="font-bold w-full">ステータス</div>
                </div>
              </div>
              <div className="text-philippine-gray min-h-3 w-full my-3">
                基本情報
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  住まい
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="prefecture"
                    validateStatus={
                      !form.getFieldValue('prefecture') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      options={prefecturesData?.edges.map(
                        (prefecture: { id: string; name: string }) => ({
                          value: prefecture.id,
                          label: prefecture.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  出生地
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="place_of_birth"
                    validateStatus={
                      !form.getFieldValue('place_of_birth') ? 'error' : ''
                    }
                  >
                    <Select
                      placeholder="未設定"
                      className="w-full !h-full rounded-full"
                      options={prefecturesData?.edges.map(
                        (prefecture: { id: string; name: string }) => ({
                          value: prefecture.id,
                          label: prefecture.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  生年月日
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="date_of_birth"
                    rules={[
                      {
                        required: true,
                        message: '選んでください',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="未設定"
                      showNow={false}
                      className="min-w-24 z-0 w-full"
                      disabledDate={disabledDate}
                      format={'YYYY/MM/DD'}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  性格タイプ
                </div>
                <div className="w-2/3">
                  <Form.Item
                    name="characters"
                    rules={[
                      {
                        required: true,
                        message: '選んでください',
                      },
                    ]}
                  >
                    <Select
                      placeholder="未設定"
                      mode="multiple"
                      className="w-full !h-full rounded-full"
                      options={characterData?.edges?.map(
                        (items: { id: string; name: string }) => ({
                          value: items.id,
                          label: items.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  体格
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="physique"
                    validateStatus={
                      !form.getFieldValue('physique') ? 'error' : ''
                    }
                  >
                    <Select
                      placeholder="未設定"
                      className="w-full !h-full rounded-full"
                      options={[
                        { value: '', label: '' },
                        { value: 'USUALLY', label: '普通' },
                        { value: 'GLAMOR', label: '細身/スリム' },
                        { value: 'SLENDER_SLIM', label: 'スポーツ' },
                        { value: 'SPORTS', label: 'グラマー' },
                        { value: 'CHUBBY', label: 'ぽっちゃり' },
                        { value: 'THICK', label: '太め' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  身長
                </div>
                <div className="w-2/3 h-12">
                  <Form.Item
                    name="height"
                    validateStatus={
                      !form.getFieldValue('height') ? 'error' : ''
                    }
                  >
                    <Input
                      type="number"
                      placeholder="未設定"
                      className="text-sm h-8"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  結婚歴
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="marital_status"
                    validateStatus={
                      !form.getFieldValue('marital_status') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'DIVORCED', label: '既婚' },
                        { value: 'MARRIED', label: '離婚' },
                        { value: 'UNMARRIED', label: '未婚' },
                        { value: 'BEREAVEMENT', label: '死別' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  子供有無
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="children"
                    validateStatus={
                      !form.getFieldValue('children') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'TOGETHER', label: 'いません' },
                        { value: 'NO_CHILDREN', label: '同居しています' },
                        { value: 'DIFFERENT_HOUSEHOLD', label: '別世帯です' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  生活
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="household"
                    validateStatus={
                      !form.getFieldValue('household') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'WITH_PARENTS', label: '一人暮らし' },
                        { value: 'ALONE', label: '親と同居' },
                        { value: 'WITH_SIBLINGS', label: '子供と同居' },
                        { value: 'WITH_CHILD', label: '親と子供と同居' },
                        {
                          value: 'WITH_PARENTS_AND_CHILDREN',
                          label: '兄弟と同居',
                        },
                        { value: 'WITH_FRIENDS', label: '友達と同居' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  住居
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="residence"
                    validateStatus={
                      !form.getFieldValue('residence') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'RENTAL_HOUSE', label: '持家戸建て' },
                        {
                          value: 'OWNER_OCCUPIED_HOUSE',
                          label: '持家マンション',
                        },
                        {
                          value: 'OWNER_OCCUPIED_APARTMENT',
                          label: '賃貸戸建て',
                        },
                        { value: 'RENTAL_APARTMENT', label: '賃貸マンション' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  車
                </div>
                <div className="w-2/3">
                  <Form.Item
                    name="cars"
                    validateStatus={
                      profileData?.cars.length === 0 ? 'error' : ''
                    }
                  >
                    <Select
                      mode="multiple"
                      placeholder="未設定"
                      className="w-full !h-full rounded-full"
                      options={carData?.edges.map(
                        (items: { id: string; name: string }) => ({
                          value: items.id,
                          label: items.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  話せる言語
                </div>
                <div className="w-2/3">
                  <Form.Item
                    name="languages"
                    validateStatus={
                      profileData?.languages.length === 0 ? 'error' : ''
                    }
                  >
                    <Select
                      mode="multiple"
                      placeholder="未設定"
                      className="w-full !h-full rounded-full"
                      options={languagesData?.edges.map(
                        (items: { id: string; name: string }) => ({
                          value: items.id,
                          label: items.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  宗教
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="religion"
                    validateStatus={
                      !form.getFieldValue('religion') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'NO_RELIGION', label: '無宗教' },
                        { value: 'SHINTO', label: '神道' },
                        { value: 'BUDDHISM', label: '仏教' },
                        { value: 'CHRISTIANITY', label: 'キリスト教' },
                        { value: 'OTHERS', label: 'その他' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  タバコ
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="cigarette"
                    validateStatus={
                      !form.getFieldValue('cigarette') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'SMOKING', label: '喫煙' },
                        { value: 'DO_NOT', label: '吸わない' },
                        { value: 'SOMETIMES', label: '時々' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  ギャンブル
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="gamble"
                    validateStatus={
                      !form.getFieldValue('gamble') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'DO', label: 'する' },
                        { value: 'DO_NOT', label: 'しない' },
                        { value: 'SOMETIMES', label: '時々' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  年収
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="income"
                    validateStatus={
                      !form.getFieldValue('income') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={incomeData?.edges.map(
                        (items: { id: string; name: string }) => ({
                          value: items.id,
                          label: items.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="my-6 text-philippine-gray">仕事・学歴</div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  学歴
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="educational_background"
                    validateStatus={
                      !form.getFieldValue('educational_background')
                        ? 'error'
                        : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={[
                        { value: '', label: '' },
                        { value: 'PhD', label: '大学院修了／博士号' },
                        { value: 'MASTER', label: '大学院修了／修士号' },
                        { value: 'BACHELOR', label: '四年制大学卒業／学士号' },
                        { value: 'JUNIOR_COLLEGE', label: '短期大学卒業' },
                        { value: 'VOCATIONAL_SCHOOL', label: '専門学校卒業' },
                        { value: 'HIGH_SCHOOL', label: '高校卒業' },
                        { value: 'HIGH_SCHOOL_DROPOUT', label: '高校中退' },
                        { value: 'JUNIOR_HIGH_SCHOOL', label: '中学校卒業' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  学校名
                </div>
                <div className="w-2/3 h-12">
                  <Form.Item
                    name="school_name"
                    validateStatus={
                      !form.getFieldValue('school_name') ? 'error' : ''
                    }
                  >
                    <Input placeholder="未設定" className="text-sm h-8" />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex flex-row my-6">
                <div className="text-primary-dark-green w-2/5 font-bold flex-grow">
                  職業
                </div>
                <div className="w-2/3 h-10">
                  <Form.Item
                    name="business"
                    validateStatus={
                      !form.getFieldValue('business') ? 'error' : ''
                    }
                  >
                    <Select
                      className="w-full !h-full rounded-full"
                      placeholder="未設定"
                      options={businessesData?.edges.map(
                        (items: { id: string; name: string }) => ({
                          value: items.id,
                          label: items.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="min-h-10 w-full flex items-center justify-center my-6">
                <Form.Item name="retired">
                  <Checkbox checked={isChecked} onChange={onChangeCheckbox}>
                    退職済み
                  </Checkbox>
                </Form.Item>
              </div>
            </Card>
            <div className="bg-white shadow-2xl min-h-12  fixed px-3 z-50 bottom-0 left-0 flex justify-end items-center w-full">
              <Link href="/profile">
                <Button
                  type="link"
                  className="!flex !bg-lavender-gray !rounded-full !text-sm !font-normal items-center !h-7 !text-ghost-white"
                >
                  キャンセル
                  <div className="w-4 h-4 flex">
                    <Image
                      src="/close.svg"
                      width={12}
                      height={12}
                      alt="close icon"
                      className="ml-2"
                    />
                  </div>
                </Button>
              </Link>
              <Form.Item className="contents">
                <Button
                  type="link"
                  htmlType="submit"
                  className="!flex !bg-picton-blue !rounded-full !text-sm !font-normal items-center !h-7 !text-ghost-white ml-2 "
                >
                  完了
                  <div className="w-4 h-4 flex">
                    <Image
                      src="/check_small.svg"
                      width={12}
                      height={12}
                      alt="close icon"
                      className="ml-2"
                    />
                  </div>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

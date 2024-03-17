import { Payment } from '@/features/payment-feature'
import Script from 'next/script'

export default function PaymentPage(): JSX.Element {
  return (
    <>
      <Payment />
      <Script src="/js/paidy.js" />
    </>
  )
}

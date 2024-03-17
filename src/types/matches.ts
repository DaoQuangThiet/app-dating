export type UserMatched = {
  id: string
  last_message: Conversation
  partner_id: string
  partner_main_photo: string
  partner_nickname: string
}

export type Conversation = {
  id: string
  content: string
  match_id: string
  sender_id: string
  receiver_id: string
  created_at: string
  updated_at: string
  seen_at: string | null
}

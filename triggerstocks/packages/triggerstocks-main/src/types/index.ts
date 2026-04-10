export type Company = {
  _id: string
  ticker: string
  name: string
  market: string
  country: string
  currency: string
}

export type TriggerStatus = 'on_time' | 'delayed' | 'cancelled' | 'triggered'
export type TriggerType = 'expected' | 'expected_update'
export type ReviewStatus = 'approved' | 'rejected' | 'pending_review'

export type Trigger = {
  _id: string
  dates: {
    dateAdded: string
    dateExpected: string
    dateExpectedUpdate: string
    dateStatusChanged?: string
  }
  title: string
  summary: string
  company: Company
  source?: {
    link: string
    text: string
  }
  prices: {
    priceAtAdded: number
    priceAtStatusChanged: number
  }
  reviewStatus?: {
    status: ReviewStatus
    comment?: string
  }
  type: TriggerType
  status: TriggerStatus
}

export type User = {
  _id: string
  name: {
    firstName: string
    lastName: string
  }
  email: string
  password: string
  preferences?: {
    digest?: boolean
    newsletter?: boolean
  }
  following: { company: Company; alerts: boolean }[]
}

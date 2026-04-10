type Trigger = {
\_id: ObjectId
dates: {
dateAdded: Date
dateExpected: Date
dateExpectedUpdate: Date
dateStatusChanged?: Date
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
status: 'approved' | 'rejected' | 'pending_review'
comment?: string
}
type: 'expected' | 'expected_update'
status: 'on_time' | 'delayed' | 'cancelled' | 'triggered'
}

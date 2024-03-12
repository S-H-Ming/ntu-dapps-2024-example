export interface IncomeRecord {
  sender: string
  amount: number
  timestamp: Date
}

export interface ExpenditureRecord {
  target: string
  amount: number
  usage: string
  timestamp: Date
}

export interface Statistics {
  current: number
  in: number
  out: number
  funding: Array<{ sender: string; amount: number }>
}

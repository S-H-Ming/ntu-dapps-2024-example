import { CONTRACT_ADDRESS, FUNDINGS_BIGMAP, TZKT_SERVER } from "@/app/constants"
import { ExpenditureRecord, IncomeRecord, Statistics } from "@/app/interfaces/data.interface"

export async function getStatistics(): Promise<Statistics> {
  type TxType = { key: string; value: string }

  const getKeysTask: Promise<Array<TxType>> = fetch(
    `${TZKT_SERVER}/v1/bigmaps/${FUNDINGS_BIGMAP}/keys?` +
      new URLSearchParams({
        select: "key,value",
        active: "true",
        limit: "10000"
      })
  )
    .then((res) => res.json() satisfies Promise<Array<TxType>>)
    .catch((e) => [])

  const getBalanceTask: Promise<number> = fetch(
    `${TZKT_SERVER}/v1/accounts/${CONTRACT_ADDRESS}/balance?`
  )
    .then((res) => res.json() satisfies Promise<number>)
    .catch((e) => 0)

  const [keys, balance] = await Promise.all([getKeysTask, getBalanceTask])

  const res = keys.reduce<{ in: number; funding: Array<{ sender: string; amount: number }> }>(
    (acc, curr) => {
      const value = parseInt(curr.value)
      return {
        in: acc.in + value,
        funding: [...acc.funding, { sender: curr.key, amount: value }]
      }
    },
    {
      in: 0,
      funding: []
    }
  )

  return {
    current: balance,
    in: res.in,
    out: res.in - balance,
    funding: res.funding
  }
}

export async function getIncomeRecords(): Promise<Array<IncomeRecord>> {
  type TxType = { timestamp: string; sender: { address: string }; amount: number }

  const transactions: Array<TxType> = await fetch(
    `${TZKT_SERVER}/v1/operations/transactions?` +
      new URLSearchParams({
        target: CONTRACT_ADDRESS,
        entrypoint: "fund",
        select: "timestamp,sender,amount",
        status: "applied",
        limit: "10000"
      })
  )
    .then((res) => res.json() satisfies Promise<Array<TxType>>)
    .catch((e) => [])

  return transactions.map((tx) => {
    return { sender: tx.sender.address, amount: tx.amount, timestamp: new Date(tx.timestamp) }
  })
}

export async function getExpenditureRecords(): Promise<Array<ExpenditureRecord>> {
  type TxType = {
    timestamp: string
    parameter: { value: { usage: string; amount: string; target: string } }
  }

  const transactions: Array<TxType> = await fetch(
    `${TZKT_SERVER}/v1/operations/transactions?` +
      new URLSearchParams({
        target: CONTRACT_ADDRESS,
        entrypoint: "withdraw",
        select: "timestamp,parameter",
        status: "applied",
        limit: "10000"
      })
  )
    .then((res) => res.json() satisfies Promise<Array<TxType>>)
    .catch((e) => [])

  return transactions.map((tx) => {
    return {
      target: tx.parameter.value.target,
      amount: parseInt(tx.parameter.value.amount),
      usage: Buffer.from(tx.parameter.value.usage, "hex").toString("utf8"),
      timestamp: new Date(tx.timestamp)
    }
  })
}

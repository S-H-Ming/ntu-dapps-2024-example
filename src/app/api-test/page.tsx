"use client"

import { useEffect, useState } from "react"
import {
  getStatistics,
  getIncomeRecords,
  getExpenditureRecords,
  type Statistics,
  type IncomeRecord,
  type ExpenditureRecord
} from "@/libs/api"

export default function Page() {
  const [statistics, setStatistics] = useState<Statistics>()
  const [incomes, setIncomes] = useState<Array<IncomeRecord>>([])
  const [expenditures, setExpenditures] = useState<Array<ExpenditureRecord>>([])

  useEffect(() => {
    getStatistics().then((res) => setStatistics(res))
    getIncomeRecords().then((res) => setIncomes(res))
    getExpenditureRecords().then((res) => setExpenditures(res))
  }, [])

  return (
    <>
      <div>Statistics</div>
      <div>
        {statistics !== undefined && (
          <div>
            <div>{`${statistics.current} | ${statistics.in} | ${statistics.out}`}</div>
            <div>
              {statistics.funding.map((fund, i) => (
                <div key={i}>{`${fund.sender} | ${fund.amount}`}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>-</div>
      <div>Incomes</div>
      <div>
        {incomes.map((income, i) => (
          <div key={i}>{`${income.sender} | ${income.amount} | ${income.timestamp}`}</div>
        ))}
      </div>
      <div>-</div>
      <div>Expenditures</div>
      <div>
        {expenditures.map((expenditure, i) => (
          <div
            key={i}
          >{`${expenditure.target} | ${expenditure.amount} | ${expenditure.usage} | ${expenditure.timestamp}`}</div>
        ))}
      </div>
    </>
  )
}

"use client"

import Image from "next/image";
import Chart from "./components/chart";
import List from "./components/list";
import { ADMIN_WALLET, CONTRACT_ADDRESS } from "./constants";
import { type Statistics, type IncomeRecord, type ExpenditureRecord } from "./interfaces/data.interface";
import React, { useEffect, useState } from "react"
import {
  getStatistics,
  getIncomeRecords,
  getExpenditureRecords,
} from "@/libs/api"


export default function Home() {

  const [statistics, setStatistics] = useState<Statistics>()
  const [incomes, setIncomes] = useState<Array<IncomeRecord>>([])
  const [expenditures, setExpenditures] = useState<Array<ExpenditureRecord>>([])

  useEffect(() => {
    getStatistics().then((res) => setStatistics(res))
    getIncomeRecords().then((res) => setIncomes(res))
    getExpenditureRecords().then((res) => setExpenditures(res))
  }, [])




  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="text-2xl mb-8 border py-4 px-8">Fundraising Example 2024</div>
      <div className="w-full text-center">
        <div className="">
          <div>Contract address: {CONTRACT_ADDRESS}</div>
          <div>Admin: {ADMIN_WALLET}</div>
          {
            statistics &&
            <React.Fragment>
              <div>Total income: {(statistics.in / 1000000).toFixed(6)} xtz</div>
              <div>Current amount: {(statistics.current / 1000000).toFixed(6)} xtz</div>
              <div>Total expenditure: {(statistics.out / 1000000).toFixed(6)} xtz</div>
            </React.Fragment>
          }
        </div>
        {
          statistics?.funding &&
          <Chart data={statistics?.funding} />
        }
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="w-1/2 border-r-2 p-6">
          <List data={incomes} title="Imcome List" />
        </div>
        <div className="w-1/2 p-6">
          <List data={expenditures} title="Expenditure by admin" />
        </div>
      </div>
    </main>
  )
}

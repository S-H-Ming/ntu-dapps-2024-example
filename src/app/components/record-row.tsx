import React from "react";
import { IncomeRecord, ExpenditureRecord } from "../interfaces/data.interface";

function isExpenditure(data: IncomeRecord | ExpenditureRecord): data is ExpenditureRecord {
    return (data as ExpenditureRecord).target !== undefined;
}

function getTimeStr(date: Date) {

    const d = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const h = date.getHours()
    const m = date.getMinutes()
    return `${d} ${h}:${m}`
}

// function showWallet(wallet: string){
//     return 
// }

export default function RecordRow({ data }: { data: IncomeRecord | ExpenditureRecord }) {



    return (
        <React.Fragment>
            {
                isExpenditure(data) &&
                <div className="px-4">
                    [ 支出 ] {data.usage}
                </div>
            }
            <div className="flex border-b py-2 px-4 w-full flex-row justify-between">
                <div className="w-1/3 truncate">{isExpenditure(data) ? data.target : data.sender}</div>
                <div>{(data.amount / 100000).toFixed(6)} xtz</div>
                <div>{getTimeStr(data.timestamp)}</div>
            </div>
        </React.Fragment>
    )
}
import { IncomeRecord, ExpenditureRecord } from "../interfaces/data.interface"
import RecordRow from "./record-row"

export default function List({ data, title }: { data: IncomeRecord[] | ExpenditureRecord[], title: string }) {

    return (
        <div>
            <div className="text-center text-xl mb-8">{title}</div>
            {
                data.map((d: IncomeRecord | ExpenditureRecord, i: number) => <RecordRow data={d} key={i} />)
            }
        </div>
    )
}
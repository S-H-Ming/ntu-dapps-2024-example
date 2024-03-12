import { Expense, Record } from "../interfaces/data.interface";

function isRecord(data: Record | Expense): data is Record {
    return (data as Record).address !== undefined;
}

export default function RecordRow({ data }: { data: Record | Expense }) {


    return (
        <div className="flex border-b py-2 px-4 w-full flex-row justify-between">
            <div>{isRecord(data) ? data.address : data.purpose}</div>
            <div>{data.volume} xtz</div>
            <div>{data.timestamp}</div>
        </div>
    )
}
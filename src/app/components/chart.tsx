"use client"

import "chart.js/auto";
import { Bar } from 'react-chartjs-2'


export default function Chart({ data }:
    { data: Array<{ sender: string; amount: number }> }) {

    const options = {
        responsive: true
    };

    const labels = data.map(d => d.sender)

    const _data = {
        labels,
        datasets: [{
            label: 'Amount',
            data: data.map(d => (d.amount / 1000000).toFixed(6)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
    };

    return (
        <div className="my-8 mx-auto max-w-[1080px]">
            <Bar options={options} data={_data} />
        </div>
    )
}
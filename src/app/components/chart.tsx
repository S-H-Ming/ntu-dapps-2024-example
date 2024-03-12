"use client"

import "chart.js/auto";
import { Bar } from 'react-chartjs-2'


export default function Chart() {

    const options = {
        responsive: true,
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [{
            data: labels.map(() => 1),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
    };

    return (
        <div className="my-8 mx-auto max-w-[1080px]">
            <Bar options={options} data={data} />
        </div>
    )
}
import { useState, useEffect } from "react"
import MyDropdown from "@/components/MyDropdown";
import Chart from "chart.js/auto";
import useSWR from 'swr';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Index() {
    const [periodOfTime, setPeriodOfTime] = useState("");
    const [chart, setChart] = useState(null);
    const { data, isLoading, error } = useSWR('./api/staticdata', fetcher);

    const months = {
        "January": "Янв",
        "February": "Фев",
        "March": "Март",
        "April": "Апр",
        "May": "Май",
        "June": "Июнь",
        "July": "Июль",
        "August": "Авг",
        "September": "Сен",
        "October": "Окт",
        "November": "Нояб",
        "December": "Дек"
    }

    const getLabels = () => {
        if (!isLoading) {
            switch (periodOfTime) {
                case "month":
                    return Object.keys(JSON.parse(data).finance.periods[0].graph.month);
                case "half_year":
                    return Object.keys(JSON.parse(data).finance.periods[0].graph.half_year).map(month => months[month]);
                case "year":
                    return Object.keys(JSON.parse(data).finance.periods[0].graph.year).map(month => months[month]);
            }
        }
    }

    const getValues = () => {
        if (!isLoading) {
            switch (periodOfTime) {
                case "month":
                    return Object.values(JSON.parse(data).finance.periods[0].graph.month);
                case "half_year":
                    return Object.values(JSON.parse(data).finance.periods[0].graph.half_year);
                case "year":
                    return Object.values(JSON.parse(data).finance.periods[0].graph.year);
            }
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (chart === null) {
                let ctx = document.getElementById('myChart').getContext('2d');
                setChart(
                    new Chart(ctx, {
                        type: 'bar',
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: "#000"
                                    },
                                    grid: {
                                        display: false,
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: "#000"
                                    },
                                    grid: {
                                        display: false,
                                    },
                                },
                            },
                            barThickness: 16,
                            borderRadius: 4,
                        },
                        data: {
                            labels: getLabels(),
                            datasets: [{
                                data: getValues(),
                                backgroundColor: '#000AFF',
                            }]
                        },
                    })
                )
            } else {
                chart.data.labels = getLabels();
                chart.data.datasets[0].data = getValues();
                chart.update();
            }
        }
    }, [periodOfTime]);

    return (
        <>
            <div className="w-[995px] h-[476px]">
                <div className="absolute left-[615px]">
                    <MyDropdown periodOfTime={periodOfTime} setPeriodOfTime={setPeriodOfTime}/>
                </div>
                <div className="absolute top-[76px] w-[995px] h-[400px] rounded-[27px] bg-[#FF00F5]/5">
                    <div className="w-[915px] h-[320px] absolute top-[40px] left-[40px]">
                    <canvas id="myChart" ></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}
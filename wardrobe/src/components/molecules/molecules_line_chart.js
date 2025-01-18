import React from 'react'
import dynamic from 'next/dynamic';
import { getCleanTitleFromCtx } from '../../modules/helpers/converter';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MoleculesLineChart(props) {
    const processChartData = (data) => {
        const keys = Object.keys(data[0])
        const stringKey = keys.find(key => typeof data[0][key] === 'string')
        const numberKeys = keys.filter(key => typeof data[0][key] === 'number')

        const series = numberKeys.map(key => ({
            name: getCleanTitleFromCtx(key), 
            data: data.map(item => ({
                x: item[stringKey],
                y: item[key] 
            }))
        }));

        return series;
    };

    const chart = {
        series: processChartData(props.data),
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                title: {
                    text: 'Months',
                },
            },
            yaxis: {
                title: {
                    text: 'Values',
                },
            },
        },
    };

    return (
        <div className="m-2 p-2">
            <Chart
                options={chart.options}
                series={chart.series}
                type="line"
                height={props.height ?? 420}
            />
        </div>
    );
}

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChartComponent = dynamic(() => import('react-apexcharts'), { ssr: false } )

export default function MoleculesChartBar(props) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <div>Loading...</div>
    }

    const data = Object.values(props.items)

    function getSeries(val) {
        let catSeries = []

        val.forEach(e => {
            catSeries.push({
                x: e.context,
                y: parseInt(e.total),
            })
        })

        return catSeries
    }

    const chart = {
        series: [{
            data: getSeries(data),
        }],
        options: {
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 8,
                },
            },
        },
    }

    return (
        <div className="m-2 p-2">
            <ChartComponent options={chart.options} series={chart.series} type="bar"
                height={props.items.length <= 2 ? 200 : props.items.length <= 4 ? 360 : props.items.length <= 7 ? 480 : props.height ?? '200'}/>
        </div>
    )
}
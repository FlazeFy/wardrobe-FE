import React from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MoleculesChartHeatmap(props) {
    const getSeries = (data) => {
        const days = ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"];
        let data_heatmap = [];
    
        days.forEach(dy => {
            const dayData = data.filter(el => el.day === dy).map(el => ({
                x: el.context,  
                y: el.total    
            }))
    
            data_heatmap.push({
                name: dy,       
                data: dayData   
            })
        })
    
        return data_heatmap;
    }
    

    const getCategories = (data) => {
        return [...new Set(data.map(item => item.context))]
    }

    const data = props.items;

    const chart = {
        series: getSeries(data),
        options: {
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.45,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            color: '#ededed',
                        }],
                    },
                    stroke: {
                        width: 2, 
                        colors: ['#000000'],
                    },
                },
            },
            dataLabels: {
                enabled: false, 
            },
            xaxis: {
                categories: getCategories(data), 
                labels: {
                    show: false, 
                },
                axisBorder: {
                    show: false, 
                },
                axisTicks: {
                    show: false,
                },
                grid: {
                    show: false,
                },
            },
            legend: {
                show: false, 
            },
            tooltip: {
                enabled: true, 
            },
            yaxis: {
                title: {
                    text: 'Days',
                },
                labels: {
                    show: true,
                },
            },
        },
    }
    

    return (
        <div className="m-2 p-2">
            <Chart
                options={chart.options}
                series={chart.series}
                type="heatmap"
                height={props.height ?? 'auto'}
            />
        </div>
    )
}

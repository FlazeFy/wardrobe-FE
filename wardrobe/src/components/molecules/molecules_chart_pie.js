import React from 'react'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MoleculesChartPie(props) {
    //Initial variable
    var chart = []

    //Converter
    const data = Object.values(props.items);

    const getSeries = (val) => {
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e.total))
        });
        return catSeries;
    }

    const getCategory = (val) => {
        let catData = [];
        val.forEach(e => { 
            catData.push(e.context)
        });
        return catData;
    }

    chart = {
        series: getSeries(data),
        options: {
            labels: getCategory(data),
            legend: {
                position: "bottom"
            },
        }
    };

    return (
        <div className="m-2 p-2">
            <Chart
                options={chart.options}
                series={chart.series}
                height={props.height ?? 'auto'}
                type="pie"
                width={"100%"}
            />
        </div>
    );
}
  
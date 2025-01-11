import React from 'react';
import Chart from 'react-apexcharts';
import GetLimit from '../controls/limit'

export default function MoleculesBarChart(props) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(props.items);

    function getSeries(val){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push({
                x: e.context,
                y: parseInt(e.total)
            });
        });
        return catSeries;
    }

    chart = {
        //series: getSeries(data),
        series: [{
            data: getSeries(data)}],
        options: {
            plotOptions: {
                bar: {
                  horizontal: true,
                  borderRadius: 8,
                },
            },
        }
    };

    return (
        <div className="m-2 p-2">
            <Chart
                options={chart.options}
                series={chart.series}
                type="bar"
                height={props.height ?? 720}
            />
        </div>
    );
}
  
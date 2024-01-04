import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import './chart.css';
const PriceRangeChart = () => {
  const [carData, setCarData] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    token: token,
  };

  useEffect(() => {
    axios
      .get('http://localhost:3009/car/chart',{headers})
      .then((response) => {
        setCarData(response.data.cars);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const prices = carData.map((car) => car.price);
    const counts = [0, 0, 0, 0, 0]; 

    for (let price of prices) {
      if (price <= 100000) {
        counts[0]++;
      } else if (price <= 200000) {
        counts[1]++;
      } else if (price <= 300000) {
        counts[2]++;
      } else if (price <= 400000) {
        counts[3]++;
      } else {
        counts[4]++;
      }
    }

    


    setChartData({
      series: counts.map((count) => Math.round((count / carData.length) * 100)),
      options: {
        labels: ['0-100k', '100k-200k', '200k-300k', '300k-400k', '400k+'],
        chart: {
          type: 'donut',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    });
  }, [carData]);

  const [chartData, setChartData] = useState({ series: [], options: {} });

  return (
    <div >
    
      <div className='chartdata'>
      <h2 style={{marginTop:"5px",color:"black"}}>Price Range Chart</h2>
      <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
      </div>
     
    </div>
  );
};

export default PriceRangeChart;

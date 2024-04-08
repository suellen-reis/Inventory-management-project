import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, productsQuantity }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Quantity of Products in Stock",
      },
      legend: {
        display: false,
      },
    },
  };

  const randomColor = () => {
    // Generate random values for RGBA
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.5;

    // Return the RGBA color string
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: productsQuantity,
        backgroundColor: productsQuantity.map(() => randomColor()),
        borderColor: ["rgba(255, 200, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        options={options}
        data={barChartData}
        style={{
          padding: "20px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></Bar>
    </div>
  );
};

export default BarChart;

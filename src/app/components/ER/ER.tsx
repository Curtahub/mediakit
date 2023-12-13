import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ER = ({ data }: { data: any }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const graphData = {
    labels: data?.labels,
    datasets: [
      {
        label: "Engajamento",
        data: data?.values,
        borderColor: "#7CAFCB",
        backgroundColor: "#7CAFCB",
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">Total</p>
      <p className="text-[16px] font-semibold uppercase">Engajamento</p>
      <div className="flex flex-1 items-center mt-[32px]">
        <Line options={options} data={graphData} />
      </div>
    </div>
  );
};

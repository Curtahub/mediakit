import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TotalPosts = () => {
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

  const labels = ["January", "February", "March", "April"];

  const data = {
    labels,
    datasets: [
      {
        label: "Valor (%)",
        data: labels.map(() => 100),
        backgroundColor: "#CE2039",
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">Mídia</p>
      <p className="text-[16px] font-semibold uppercase">Posts totais</p>
      <div className="flex flex-1 items-center mt-[32px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

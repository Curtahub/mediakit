import { Bar } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AudienceInterests = ({ data }: { data: any }) => {
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

  const labels = data?.labels || [];
  const graphData = {
    labels,
    datasets: [
      {
        label: "Valor (%)",
        data: data?.values || [],
        backgroundColor: "#7CAFCB",
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">
        Público alcançado
      </p>
      <p className="text-[16px] font-semibold uppercase">
        Interesse da audiência
      </p>
      <div className="flex flex-1 items-center">
        <Bar options={options} data={graphData} />
      </div>
    </div>
  );
};

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

export const Languages = ({ languages }: { languages: any }) => {
  const data = {
    labels: languages?.labels || [],
    datasets: [
      {
        label: "Valor (%)",
        data: languages?.values || [],
        backgroundColor: "#7CAFCB",
      },
    ],
  };

  const horizontalBarOptions = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
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

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039] dark:text-[#B8B8B8]">
        Público Alcançado
      </p>
      <p className="text-[16px] font-semibold uppercase mb-[16px]">Idiomas</p>
      <div className="flex justify-center items-center h-[80%]">
        <Bar options={horizontalBarOptions} data={data} />
      </div>
    </div>
  );
};

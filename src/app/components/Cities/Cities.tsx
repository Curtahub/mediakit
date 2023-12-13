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

export const Cities = ({ cities }: { cities: any }) => {
  const data = {
    labels: cities?.labels || [],
    datasets: [
      {
        label: "Valor (%)",
        data: cities.values || [],
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
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">
        Público alcançado
      </p>
      <p className="text-[16px] font-semibold uppercase mb-[16px]">Cidades</p>
      <div className="flex justify-center items-center h-[80%]">
        {cities.values.length === 0 ? (
          <p>No data</p>
        ) : (
          <Bar options={horizontalBarOptions} data={data} />
        )}
      </div>
    </div>
  );
};

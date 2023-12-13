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

export const AgeRange = ({ demographyByAge }: { demographyByAge: any }) => {
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

  const labels = demographyByAge?.labels || [];
  const data = {
    labels,
    datasets: [
      {
        label: "Valor (%)",
        data: demographyByAge?.values || [],
        backgroundColor: "#7CAFCB",
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039] dark:text-[#B8B8B8]">
        Público alcançado
      </p>
      <p className="text-[16px] font-semibold uppercase">Faixa etária</p>
      <div className="flex flex-1 items-center justify-center">
        {demographyByAge?.values.length === 0 ? (
          <p>No data</p>
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
};

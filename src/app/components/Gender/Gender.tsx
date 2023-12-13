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
import { useTheme } from "next-themes";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Gender = ({ demographyByAge }: { demographyByAge: any }) => {
  const { theme } = useTheme();
  const darkColor = theme === "dark" ? "#272636" : "#101010";

  const pieData = {
    labels: ["Masculino", "Feminino"],
    datasets: [
      {
        label: "Valor (%)",
        data: [demographyByAge?.male || 0, demographyByAge?.female || 0],
        backgroundColor: ["#CE2039", darkColor],
        borderColor: ["#CE2039", darkColor],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[12px] font-medium uppercase text-[#CE2039] dark:text-[#B8B8B8]">
        Mídia
      </p>
      <p className="text-[16px] font-semibold uppercase mb-[16px]">Gênero</p>
      <div className="flex items-center justify-center h-[80%]">
        {demographyByAge?.male === 0 && demographyByAge?.female === 0 ? (
          <p>No data</p>
        ) : (
          <Pie data={pieData} />
        )}
      </div>
    </div>
  );
};

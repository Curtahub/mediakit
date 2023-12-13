import { abbreviateNumber } from "@/app/utils/utils";
export const ViewsCount = ({ views }: { views: number }) => {
  return (
    <div className="bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[14px] font-semibold uppercase">Visualizações</p>
      <p className="text-[32px] font-bold uppercase text-[#CE2039]">
        {abbreviateNumber(views)}
      </p>
      <p className="text-[14px] font-normal max-w-[144px]">
        Número total de visualizações
      </p>
    </div>
  );
};

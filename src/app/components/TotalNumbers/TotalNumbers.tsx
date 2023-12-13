import { abbreviateNumber } from "@/app/utils/utils";
import { ThumbsUpIcon } from "@/app/icons/ThumbsUpIcon";
import { useTheme } from "next-themes";
import { CommentaryIcon } from "@/app/icons/CommentaryIcon";
import { BarChartIcon } from "@/app/icons/BarChartIcon";
import { LineChartIcon } from "@/app/icons/LineChartIcon";

export const TotalNumbers = ({ data }: any) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : undefined;

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px] ">
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">
        Por data de publicação
      </p>
      <p className="text-[16px] font-semibold uppercase">Números totais</p>
      <div className="flex flex-1 flex-row gap-[32px] mt-[32px]">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between py-[32px] px-[18px]">
              <div className="flex flex-row items-center gap-[12px]">
                <ThumbsUpIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Curtidas</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(data.likes.total)}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[32px] px-[18px] rounded-[4px] bg-[#F3F3F3] dark:bg-[#232529]">
              <div className="flex flex-row items-center gap-[12px]">
                <CommentaryIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Comentários</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(data.comments.total)}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[32px] px-[18px]">
              <div className="flex flex-row items-center gap-[12px]">
                <BarChartIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Compartilhamento</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(data.shares.total)}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[32px] px-[18px] rounded-[4px] bg-[#F3F3F3] dark:bg-[#232529]">
              <div className="flex flex-row items-center gap-[12px]">
                <LineChartIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Engajamento</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(data.reachability.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

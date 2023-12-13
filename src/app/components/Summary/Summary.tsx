import { abbreviateNumber } from "@/app/utils/utils";
import { InstagramIcon } from "@/app/icons/InstagramIcon";
import { useTheme } from "next-themes";
import { TikTokIcon } from "@/app/icons/TikTokIcon";
import { YoutubeIcon } from "@/app/icons/YoutubeIcon";

type SummaryProps = {
  data: any;
  type: "instagram" | "tiktok" | "youtube";
};

export const Summary = ({ type, data }: SummaryProps) => {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (type) {
      case "instagram":
        return (
          <InstagramIcon
            color={theme === "dark" ? "white" : "black"}
            width="32"
            height="32"
          />
        );
      case "tiktok":
        return (
          <TikTokIcon
            color={theme === "dark" ? "white" : "black"}
            width={32}
            height={32}
          />
        );
      case "youtube":
        return (
          <YoutubeIcon
            color={theme === "dark" ? "white" : "black"}
            width={32}
            height={32}
          />
        );
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <div className="flex flex-row mb-[32px] gap-[14px]">
        {getIcon()}
        <div className="flex flex-col">
          <p className="text-[12px] font-medium uppercase text-[#CE2039] dark:text-[#B8B8B8]">
            Por data de publicação
          </p>
          <p className="text-[14px] font-semibold uppercase">Total</p>
        </div>
      </div>
      <div className="flex flex-row gap-[32px]">
        <div className="flex flex-col gap-[24px]">
          <div>
            <p className="text-[24px] font-bold uppercase text-[#101010] dark:text-[#D9D9D9]">
              {abbreviateNumber(data?.reach.toFixed(1))}
            </p>
            <p className="text-[14px] font-normal">Média de Alcance</p>
          </div>
          <div>
            <p className="text-[24px] font-bold uppercase text-[#101010] dark:text-[#D9D9D9]">
              {abbreviateNumber(data?.engagementRate.toFixed(1))}
            </p>
            <p className="text-[14px] font-normal">Engajamento</p>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <div>
            <p className="text-[24px] font-bold uppercase text-[#101010] dark:text-[#D9D9D9]">
              {abbreviateNumber(data?.followersCount.toFixed(1))}
            </p>
            <p className="text-[14px] font-normal">Seguidores</p>
          </div>
          <div>
            <p className="text-[24px] font-bold uppercase text-[#101010] dark:text-[#D9D9D9]">
              {abbreviateNumber(data?.impressions.toFixed(1))}
            </p>
            <p className="text-[14px] font-normal">Impressões</p>
          </div>
        </div>
      </div>
    </div>
  );
};

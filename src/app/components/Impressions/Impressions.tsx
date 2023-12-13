import { InstagramIcon } from "@/app/icons/InstagramIcon";
import { TikTokIcon } from "@/app/icons/TikTokIcon";
import { YoutubeIcon } from "@/app/icons/YoutubeIcon";
import { abbreviateNumber } from "@/app/utils/utils";
import { useTheme } from "next-themes";

export const Impressions = ({ data }: { data: any }) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#D9D9D9" : "white";

  return (
    <div className="flex flex-col md:flex-row gap-[24px]">
      <div className="flex flex-1 flex-col p-[32px] rounded-2xl bg-[#CE2039] dark:bg-[#4E5157] gap-[14px]">
        <YoutubeIcon color={iconColor} width={24} height={24} />
        <div className="flex flex-row gap-[24px]">
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Inscritos
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.youtube?.followersCount)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Média de views
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.youtube?.reach)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-[32px] rounded-2xl bg-[#CE2039] dark:bg-[#4E5157] gap-[14px]">
        <InstagramIcon color={iconColor} width={24} height={24} />
        <div className="flex flex-row gap-[24px]">
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Seguidores
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.instagram?.followersCount)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Pessoas atingidas
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.instagram?.reach)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-[32px] rounded-2xl bg-[#CE2039] dark:bg-[#4E5157] gap-[14px]">
        <TikTokIcon color={iconColor} width={24} height={24} />
        <div className="flex flex-row gap-[24px]">
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Seguidores
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.tiktok?.followersCount)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-white font-semibold uppercase">
              Alcance
            </span>
            <span className="text-[24px] text-white font-bold">
              {abbreviateNumber(data?.tiktok?.reach)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

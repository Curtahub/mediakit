import { InstagramIcon } from "@/app/icons/InstagramIcon";
import { TikTokIcon } from "@/app/icons/TikTokIcon";
import { YoutubeIcon } from "@/app/icons/YoutubeIcon";
import { useTheme } from "next-themes";
import { SummaryIcon } from "@/app/icons/SummaryIcon";

type SocialMediaNavBarItemProps = {
  title: string;
  type: string;
  menuOption: string;
  onClick: () => void;
};

export const AnalyticsNavbarItem = ({
  title,
  type,
  menuOption,
  onClick,
}: SocialMediaNavBarItemProps) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "#D9D9D9" : "black";
  const commonNavStyle =
    "flex flex-row items-center px-[14px] py-[10px] cursor-pointer mr-[10px]";

  const getIcon = () => {
    switch (type) {
      case "summary":
        return (
          <SummaryIcon
            color={menuOption === type ? "white" : iconColor}
            width={18}
            height={18}
          />
        );
      case "youtube":
        return (
          <YoutubeIcon
            color={menuOption === type ? "white" : iconColor}
            width={18}
            height={18}
          />
        );
      case "instagram":
        return (
          <InstagramIcon
            color={menuOption === type ? "white" : iconColor}
            width={18}
            height={18}
          />
        );
      case "tiktok":
        return (
          <TikTokIcon
            color={menuOption === type ? "white" : iconColor}
            width={18}
            height={18}
          />
        );
    }
  };

  return (
    <div
      className={`${commonNavStyle} ${
        menuOption === type && "bg-[#CE2039] rounded-[48px]"
      }`}
      onClick={onClick}
    >
      {getIcon()}
      <p
        className={`ml-[8px] ${
          menuOption === type
            ? "text-white"
            : theme === "dark"
            ? "text-white"
            : "text-black"
        } text-[12px] font-normal`}
      >
        {title}
      </p>
    </div>
  );
};

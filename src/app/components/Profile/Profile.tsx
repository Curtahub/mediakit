import Image from "next/image";
import Link from "next/link";
import { Influencer } from "@/app/api/influencer/[id]/route";
import { CalendarIcon } from "@/app/icons/CalendarIcon";
import { LocationIcon } from "@/app/icons/LocationIcon";
import { useTheme } from "next-themes";
import { MessageIcon } from "@/app/icons/MessageIcon";
import { ArrowRightUpIcon } from "@/app/icons/ArrowRightUpIcon";
import { GlobeIcon } from "@/app/icons/GlobeIcon";
import { InstagramIcon } from "@/app/icons/InstagramIcon";
import { YoutubeIcon } from "@/app/icons/YoutubeIcon";
import { TikTokIcon } from "@/app/icons/TikTokIcon";
import { differenceInYears, parse } from "date-fns";

type ProfileProps = {
  influencer: Influencer;
};

export const Profile = ({ influencer }: ProfileProps) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : "#101010";

  const calculateAge = (dob: string): number => {
    const date = parse(dob, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), date);
    return age;
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-1 flex-row p-[32px] bg-white dark:bg-[#1A1B1E] rounded-2xl items-center">
        <div className="w-[104px] h-[104px] rounded-full bg-[#f1f4fa] overflow-hidden mr-[24px]">
          <Image
            src={influencer?.picture}
            alt="Influencer picture"
            width={104}
            height={104}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[20px] font-bold  dark:text-white">
            {influencer?.name}
          </p>
          <ul className="mt-[18px]">
            <li className="flex flex-row items-center mb-[12px]">
              <CalendarIcon color={iconColor} />
              <span className="text-[14px] ml-[8px] dark:text-[#D9D9D9]">
                {calculateAge(influencer?.date_of_birth) || 0} anos
              </span>
            </li>
            {influencer?.city && influencer?.uf && (
              <li className="flex flex-row justify-center items-center mb-[12px]">
                <LocationIcon color={iconColor} />
                <span className="text-[14px] ml-[8px] dark:text-[#D9D9D9]">
                  {`${influencer?.city}, ${influencer?.uf}`}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="p-[32px] bg-white dark:bg-[#1A1B1E] rounded-2xl">
        <div className="flex flex-col">
          <p className="text-[14px] font-semibold uppercase">Informações</p>
          <ul className="mt-[24px]">
            <li>
              <Link
                href="mailto:comercial@agenciacurta.com"
                className="flex flex-row mb-[16px] items-center cursor-pointer"
              >
                <div className="flex flex-row items-center w-[100px]">
                  <MessageIcon color={iconColor} />
                  <span className="text-[14px] font-medium ml-[10px]">
                    Contato
                  </span>
                </div>
                <span className="text-[14px] ml-[24px]">
                  comercial@agenciacurta.com
                </span>
                <ArrowRightUpIcon color={iconColor} />
              </Link>
            </li>
            <li>
              <Link
                href="https://curtahub.com.br"
                target="_blank"
                className="flex flex-row mb-[16px] items-center cursor-pointer"
              >
                <div className="flex flex-row items-center w-[100px]">
                  <GlobeIcon color={iconColor} />
                  <span className="text-[14px] font-medium ml-[10px]">
                    Website
                  </span>
                </div>
                <span className="text-[14px] ml-[24px]">curtahub.com.br</span>
                <ArrowRightUpIcon color={iconColor} />
              </Link>
            </li>
            {influencer.instagram_username && (
              <li>
                <Link
                  href={`https://instagram.com/${influencer.instagram_username}`}
                  target="_blank"
                  className="flex flex-row mb-[16px] items-center cursor-pointer"
                >
                  <div className="flex flex-row items-center w-[100px]">
                    <InstagramIcon color={iconColor} />
                    <span className="text-[14px] font-medium ml-[10px]">
                      Instagram
                    </span>
                  </div>
                  <span className="text-[14px] ml-[24px]">
                    {influencer.instagram_username}
                  </span>
                  <ArrowRightUpIcon color={iconColor} />
                </Link>
              </li>
            )}
            {influencer.yt_username && (
              <li>
                <Link
                  href={`https://youtube.com/${influencer.yt_username}`}
                  target="_blank"
                  className="flex flex-row mb-[16px] items-center cursor-pointer"
                >
                  <div className="flex flex-row items-center w-[100px]">
                    <YoutubeIcon color={iconColor} />
                    <span className="text-[14px] font-medium ml-[10px]">
                      Youtube
                    </span>
                  </div>
                  <span className="text-[14px] ml-[24px]">
                    {influencer.yt_username}
                  </span>
                  <ArrowRightUpIcon color={iconColor} />
                </Link>
              </li>
            )}
            {influencer.tiktok_username && (
              <li>
                <Link
                  href={`https://tiktok.com/@${influencer.tiktok_username}`}
                  target="_blank"
                  className="flex flex-row items-center cursor-pointer"
                >
                  <div className="flex flex-row items-center w-[100px]">
                    <TikTokIcon color={iconColor} />
                    <span className="text-[14px] font-medium ml-[10px]">
                      TikTok
                    </span>
                  </div>
                  <span className="text-[14px] ml-[24px]">
                    {influencer.tiktok_username}
                  </span>
                  <ArrowRightUpIcon color={iconColor} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

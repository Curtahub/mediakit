import { CurtaIcon } from "@/app/icons/CurtaIcon";
import { FavoriteIcon } from "@/app/icons/FavoriteIcon";
import { MoonIcon } from "@/app/icons/MoonIcon";
import { SunIcon } from "@/app/icons/SunIcon";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const NavBar = () => {
  const liStyle =
    "flex flex-row items-center mr-[40px] p-[10px] cursor-pointer rounded-[48px]";

  const { theme, setTheme } = useTheme();
  const iconColor = theme === "light" ? "#101010" : undefined;

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [setTheme]);

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-[#1A1B1E] px-[40px] py-[18px]">
      {theme === "dark" ? (
        <Image
          src="/curta-logo-white.svg"
          alt="Curta logo"
          width={115}
          height={15}
        />
      ) : (
        <Image src="/curta-logo.svg" alt="Curta logo" width={115} height={15} />
      )}

      <div className="flex flex-1 justify-between flex-col md:flex-row">
        <ul className="flex flex-col md:flex-row ml-0 md:ml-[80px] mt-[40px] md:mt-0">
          <li>
            <Link
              href="https://curtahub.com.br"
              target="_blank"
              className={liStyle}
            >
              <FavoriteIcon color={theme === "dark" ? "white" : undefined} />
              <p className="text-[14px] ml-[14px] font-medium">Influencers</p>
            </Link>
          </li>
          <li>
            <Link
              href="https://curtahub.com.br"
              target="_blank"
              className={liStyle}
            >
              <CurtaIcon color={theme === "dark" ? "white" : undefined} />
              <p className="text-[14px] ml-[14px] font-medium">
                Conheça a Curta!
              </p>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row mt-[20px] md:mt-0">
          <li
            className={`${liStyle} md:mr-4 ${
              theme === "light" && "bg-[#CE2039] text-white"
            }`}
            onClick={() => {
              setTheme("light");
              localStorage.setItem("theme", "light");
              document.documentElement.classList.remove("dark");
            }}
          >
            <SunIcon color="white" />
            <p className="text-[14px] ml-[8px] font-medium">Light</p>
          </li>
          <li
            className={`${liStyle} md:mr-0 ${
              theme === "dark" && "bg-[#CE2039]"
            }`}
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
              document.documentElement.classList.add("dark");
            }}
          >
            <MoonIcon color={iconColor} />
            <p className="text-[14px] ml-[8px] font-medium">Dark</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

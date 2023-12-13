import Image from "next/image";
import { abbreviateNumber } from "@/app/utils/utils";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { useTheme } from "next-themes";
import { CommentaryIcon } from "@/app/icons/CommentaryIcon";
import { ThumbsUpIcon } from "@/app/icons/ThumbsUpIcon";
import { ShareIcon } from "@/app/icons/ShareIcon";
import { VisibleIcon } from "@/app/icons/VisibleIcon";

export const Post = ({ post, influencer }: { post: any; influencer: any }) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : undefined;

  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      <div className="flex flex-1 flex-col">
        <div className="bg-white dark:bg-[#1A1B1E] rounded-tl-2xl rounded-tr-2xl py-[12px] px-[16px]">
          <div className="flex flex-row gap-[8px] items-center">
            <div className="w-[35px] h-[35px] rounded-full bg-[#f1f4fa] overflow-hidden ">
              <Image
                src={influencer?.picture}
                alt="Image icon"
                width={35}
                height={35}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-semibold">{influencer?.name}</p>
              <span className="text-[8px]">
                {new Date(post?.basic?.date * 1000).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[400px] overflow-hidden justify-center items-center">
          <ImageWithFallback
            src={post?.basic?.thumbnail}
            alt="Post"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="flex justify-between bg-white dark:bg-[#1A1B1E] rounded-bl-2xl rounded-br-2xl py-[12px] px-[16px] ">
          <div className="flex flex-row gap-[8px]">
            <Image
              src="/heart-icon.svg"
              alt="Heart icon"
              width={20}
              height={20}
            />
            <Image
              src="/chat-icon.svg"
              alt="Chat icon"
              width={20}
              height={20}
            />
            <Image
              src="/paper-plane-icon.svg"
              alt="Paper plane icon"
              width={20}
              height={20}
            />
          </div>
          <Image
            src="/bookmark-icon.svg"
            alt="Bookmark icon"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-1 bg-white dark:bg-[#1A1B1E] rounded-2xl p-[16px]">
        <div className="flex flex-1 flex-row gap-[10px]">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between py-[10px] px-[8px]">
              <div className="flex  flex-row items-center gap-[8px]">
                <VisibleIcon color={iconColor} width={10} height={10} />
                <p className="text-[10px] font-normal">Views</p>
              </div>
              <p className="text-[10px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(post?.metrics?.views)}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[10px] px-[8px] bg-[#F3F3F3] dark:bg-[#232529] rounded-[4px]">
              <div className="flex flex-row items-center gap-[8px]">
                <CommentaryIcon color={iconColor} width={10} height={10} />
                <p className="text-[10px] font-normal">Comentários</p>
              </div>
              <p className="text-[10px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(post?.metrics?.comments)}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between py-[10px] px-[8px]">
              <div className="flex flex-row items-center gap-[8px]">
                <ThumbsUpIcon color={iconColor} width={10} height={10} />
                <p className="text-[10px] font-normal">Curtidas</p>
              </div>
              <p className="text-[10px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(post?.metrics?.likes)}
              </p>
            </div>

            <div className="flex flex-row justify-between py-[10px] px-[8px] bg-[#F3F3F3] dark:bg-[#232529] rounded-[4px]">
              <div className="flex flex-row items-center gap-[8px]">
                <ShareIcon color={iconColor} width={10} height={10} />
                <p className="text-[10px] font-normal">Comp.</p>
              </div>
              <p className="text-[10px] font-medium text-[#000] dark:text-[#FFF]">
                {abbreviateNumber(post?.metrics?.shares) || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { ThumbsUpIcon } from "@/app/icons/ThumbsUpIcon";
import { useTheme } from "next-themes";
import { CommentaryIcon } from "@/app/icons/CommentaryIcon";
import { BarChartIcon } from "@/app/icons/BarChartIcon";
import { LineChartIcon } from "@/app/icons/LineChartIcon";

export const LastPost = ({ post }: any) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : "black";

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px] ">
      <p className="text-[12px] font-medium uppercase text-[#CE2039]">Post</p>
      <p className="text-[16px] font-semibold uppercase">Último post</p>
      <div className="flex flex-col md:flex-row gap-[32px] mt-[32px]">
        <div className="flex items-center justify-center">
          <ImageWithFallback
            src={post.basic.thumbnail}
            alt="Post"
            width={300}
            height={300}
            className="rounded-[10px]"
          />
        </div>

        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between py-[32px] px-[18px]">
              <div className="flex flex-row items-center gap-[12px]">
                <ThumbsUpIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Curtidas</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {post.metrics.likes_count}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[32px] px-[18px] rounded-[4px] bg-[#F3F3F3] dark:bg-[#232529]">
              <div className="flex flex-row items-center gap-[12px]">
                <CommentaryIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Comentários</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {post.metrics.comments_count}
              </p>
            </div>
            <div className="flex flex-row justify-between py-[32px] px-[18px]">
              <div className="flex flex-row items-center gap-[12px]">
                <BarChartIcon color={iconColor} width={16} height={16} />
                <p className="text-[14px] font-normal">Visualizações</p>
              </div>
              <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                {post.metrics.views_count}
              </p>
            </div>
            {post.metrics.shares_count && (
              <div className="flex flex-row justify-between py-[32px] px-[18px] rounded-[4px] bg-[#F3F3F3] dark:bg-[#232529]">
                <div className="flex flex-row items-center gap-[12px]">
                  <LineChartIcon color={iconColor} width={16} height={16} />
                  <p className="text-[14px] font-normal">Engajamento</p>
                </div>
                <p className="text-[14px] font-medium text-[#000] dark:text-[#FFF]">
                  {post.metrics.shares_count}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

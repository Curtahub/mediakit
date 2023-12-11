import Image from "next/image";
import { Followers } from "@/app/components/Followers/Followers";
import { Following } from "../Following/Following";
import { AgeRange } from "../AgeRange/AgeRange";
import { Gender } from "../Gender/Gender";
import { TotalPosts } from "../TotalPosts/TotalPosts";
import { Countries } from "../Countries/Countries";
import { Languages } from "../Languages/Languages";
import { Summary } from "../Summary/Summary";
import { Post } from "@/app/components/Post/Post";

export const AnalyticsSummary = ({
  influencer,
  data,
}: {
  influencer: any;
  data: any;
}) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col md:flex-row gap-[24px]">
        <AgeRange demographyByAge={data?.demographyByAge} />
        <Gender demographyByAge={data?.demographyByAge} />
      </div>
      <div className="flex flex-1 flex-col md:flex-row gap-[24px]">
        <Countries countries={data?.countries} />
        <Languages languages={data?.languages} />
      </div>

      <div className="flex flex-1 flex-col md:flex-row gap-[24px]">
        <Summary type="instagram" data={data?.instagram} />
        <Summary type="youtube" data={data?.youtube} />
        <Summary type="tiktok" data={data?.tiktok} />
      </div>
    </div>
  );
};

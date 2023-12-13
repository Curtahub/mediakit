import { Post } from "@/app/components/Post/Post";
import { LastPost } from "../LastPost/LastPost";
import { Followers } from "@/app/components/Followers/Followers";
import { Following } from "@/app/components/Following/Following";
import { AgeRange } from "../AgeRange/AgeRange";
import { Gender } from "../Gender/Gender";
import { Languages } from "../Languages/Languages";
import { Cities } from "../Cities/Cities";
import { Countries } from "../Countries/Countries";
import { FollowersChart } from "../FollowersChart/FollowersChart";
import { ER } from "../ER/ER";
import { AudienceInterests } from "../AudienceInterests/AudienceInterests";

export const AnalyticsInstagram = ({
  influencer,
  data,
  error,
}: {
  influencer: any;
  data: any;
  error: boolean;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      {error ? (
        <span className="text-center mt-10">Sem dados</span>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-[24px]">
            <LastPost post={data?.lastPost} />
            <FollowersChart data={data?.followersChart} />
          </div>

          <div className="flex flex-col md:flex-row gap-[24px]">
            <div className="flex flex-col gap-[24px]">
              <Followers followers={data?.followersCount} />
              <Following following={data?.followingsCount} />
            </div>
            <AgeRange demographyByAge={data?.demographyByAge} />
            <Gender demographyByAge={data?.demographyByAge} />
          </div>

          <div className="flex flex-col md:flex-row gap-[24px]">
            <Countries countries={data?.audienceGeography?.countries} />
            <Cities cities={data?.audienceGeography?.cities} />
            <Languages languages={data?.languages} />
          </div>

          <div className="flex flex-col md:flex-row gap-[24px]">
            <ER data={data?.engagementRate} />
            <AudienceInterests data={data?.audienceInterests} />
          </div>

          <div className="flex flex-1 flex-col bg-white dark:bg-[#1A1B1E] rounded-2xl py-[18px] px-[24px]">
            <p className="text-[24px] font-bold">Em Alta</p>
          </div>

          <div className="flex flex-1 flex-col md:flex-row gap-[24px]">
            {data?.posts.map((post: any, index: number) => (
              <Post influencer={influencer} key={index} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

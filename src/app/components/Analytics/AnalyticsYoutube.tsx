import { Followers } from "@/app/components/Followers/Followers";
import { AgeRange } from "../AgeRange/AgeRange";
import { Gender } from "../Gender/Gender";
import { ViewsCount } from "../ViewsCount/ViewsCount";
import { FollowersChart } from "@/app/components/FollowersChart/FollowersChart";
import { ER } from "@/app/components/ER/ER";
import { Languages } from "@/app/components/Languages/Languages";
import { Countries } from "@/app/components/Countries/Countries";
import { ViewsChart } from "../ViewsChart/ViewsChart";

export const AnalyticsYoutube = ({
  data,
  error,
}: {
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
            <div className="flex flex-col  gap-[24px]">
              <Followers followers={data?.followersCount} />
              <ViewsCount views={data?.viewsCount} />
            </div>
            <AgeRange demographyByAge={data?.demographyByAge} />
            <Gender demographyByAge={data?.demographyByAge} />
          </div>

          <div className="flex flex-col md:flex-row gap-[24px]">
            <FollowersChart data={data?.followersChart} />
            <ER data={data?.engagementRate} />
          </div>

          <div className="flex flex-col md:flex-row gap-[24px]">
            <Countries countries={data?.audienceGeography?.countries} />
            <ViewsChart data={data?.views} />
            <Languages languages={data?.languages} />
          </div>
        </>
      )}
    </div>
  );
};

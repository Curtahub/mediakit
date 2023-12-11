import { useState } from "react";
import { AnalyticsNavbarItem } from "./AnalyticsNavbarItem";
import { AnalyticsSummary } from "./AnalyticsSummary";
import { AnalyticsInstagram } from "./AnalyticsInstagram";
import { AnalyticsTikTok } from "./AnalyticsTikTok";
import { AnalyticsYoutube } from "@/app/components/Analytics/AnalyticsYoutube";
import { Loading } from "../Loading/Loading";

export const Analytics = ({
  influencer,
  summary,
}: {
  influencer: any;
  summary: any;
}) => {
  const [menuOption, setMenuOption] = useState("summary");
  const [loading, setLoading] = useState<boolean>(false);
  const [youtubeData, setYoutubeData] = useState<any>();
  const [instagramData, setInstagramData] = useState<any>();
  const [tikTokData, setTikTokData] = useState<any>();

  async function fetchYoutubeData(slug: string) {
    setLoading(true);
    const res = await fetch(`/api/influencer/${slug}/youtube`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function fetchInstagramData(slug: string) {
    setLoading(true);
    const res = await fetch(`/api/influencer/${slug}/instagram`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function fetchTikTokData(slug: string) {
    setLoading(true);
    const res = await fetch(`/api/influencer/${slug}/tiktok`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  const renderAnalytics = () => {
    switch (menuOption) {
      case "summary":
        return <AnalyticsSummary influencer={influencer} data={summary} />;
      case "youtube":
        return <AnalyticsYoutube influencer={influencer} data={youtubeData} />;
      case "instagram":
        return (
          <AnalyticsInstagram influencer={influencer} data={instagramData} />
        );
      case "tiktok":
        return <AnalyticsTikTok influencer={influencer} data={tikTokData} />;
      default:
        return <p>Summary</p>;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-[24px]">
      <div className="flex flex-col md:flex-row bg-white dark:bg-[#1A1B1E] rounded-2xl py-[18px] px-[24px]">
        <AnalyticsNavbarItem
          title="Resumo"
          type="summary"
          menuOption={menuOption}
          onClick={() => {
            setMenuOption("summary");
          }}
        />
        <AnalyticsNavbarItem
          title="Youtube"
          type="youtube"
          menuOption={menuOption}
          onClick={() => {
            setMenuOption("youtube");
            if (!youtubeData) {
              fetchYoutubeData(influencer.slug).then((data) => {
                setLoading(false);
                setYoutubeData(data);
              });
            }
          }}
        />
        <AnalyticsNavbarItem
          title="Instagram"
          type="instagram"
          menuOption={menuOption}
          onClick={() => {
            setMenuOption("instagram");
            if (!instagramData) {
              fetchInstagramData(influencer.slug).then((data) => {
                setLoading(false);
                setInstagramData(data);
              });
            }
          }}
        />
        <AnalyticsNavbarItem
          title="TikTok"
          type="tiktok"
          menuOption={menuOption}
          onClick={() => {
            setMenuOption("tiktok");
            if (!tikTokData) {
              fetchTikTokData(influencer.slug).then((data) => {
                setLoading(false);
                setTikTokData(data);
              });
            }
          }}
        />
      </div>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <Loading />
        </div>
      ) : (
        renderAnalytics()
      )}
    </div>
  );
};

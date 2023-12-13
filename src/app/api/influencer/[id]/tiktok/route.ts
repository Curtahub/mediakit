import executeQuery from "@/lib/db";
import { Influencer } from "../route";

export async function GET(req: Request) {
  try {
    const slug = req.url.split("influencer/")[1].split("/")[0];
    const result = (await executeQuery({
      query: "SELECT * FROM influenciadores_mk_digital_att WHERE slug = ?",
      values: [slug],
    })) as Influencer[];

    const tiktokAccount = result[0].tiktok_username;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token":
        "$2y$04$qoboZYiJNVt0ee/cG/GYMOrVG1Livi9ozZA1CSmNUPhqca7ryMZeG",
      "X-Auth-Id": "2077196",
    };
    const hypeURL = `https://hypeauditor.com/api/method/auditor.tiktok/?channel=${tiktokAccount}`;
    const res = await fetch(hypeURL, {
      headers,
    });

    const data = await res.json();

    const ageGenderData = data.result.report.features.audience_age_gender.data;
    const demographyByAge = {
      male: 0,
      female: 0,
      labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [],
    } as any;

    await Promise.all(
      Object.keys(ageGenderData).map((age: any, index: number) => {
        let ageCount = 0;
        Object.keys(ageGenderData[age]).map((ageNumber: any) => {
          ageCount += ageGenderData[age][ageNumber];
        });
        demographyByAge.male += ageGenderData[age]["male"];
        demographyByAge.female += ageGenderData[age]["female"];
        demographyByAge.values[index] = ageCount;
      })
    );

    const influencerId = data.result.report.basic.id;
    const hypeMediaURL = `https://hypeauditor.com/api/method/auditor.tiktokMedia/?channelId=${influencerId}`;
    const resMedia = await fetch(hypeMediaURL, {
      headers,
    });
    const mediaData = await resMedia.json();

    const posts = [] as any;
    const engagingPosts =
      mediaData.result.most_engaging_media.performance["all"].media_ids;
    await Promise.all(
      engagingPosts.map(async (engagingPostId: string, index: number) => {
        if (index > 3) return;
        Object.keys(mediaData.result.media).map((postId: string) => {
          if (engagingPostId === postId) {
            const postData = mediaData.result.media[postId];
            posts.push({
              basic: {
                ...postData.basic,
                date: postData.basic.exact_create_time,
              },
              metrics: {
                views: postData.metrics.views_count.value,
                likes: postData.metrics.likes_count.value,
                comments: postData.metrics.comments_count.value,
                shares: postData.metrics.shares_count.value,
              },
            });
          }
        });
      })
    );

    const lastPostId = Object.keys(mediaData.result.media)[0];
    const lastPost = mediaData.result.media[lastPostId];

    const followersChart = { labels: [], values: [] } as any;
    const subscribersCount =
      data.result.report.metrics.subscribers_count.performance;

    await Promise.all(
      Object.keys(subscribersCount).map((period: any) => {
        followersChart.labels.push(period);
        followersChart.values.push(subscribersCount[period].value);
      })
    );

    const er = { labels: [], values: [] } as any;
    const engagementRate = data.result.report.metrics.er.performance;
    await Promise.all(
      Object.keys(engagementRate).map((period: any) => {
        er.labels.push(period);
        er.values.push(engagementRate[period].value);
      })
    );

    return Response.json({
      followersCount: data.result.report.metrics.subscribers_count.value,
      followingsCount: data.result.report.metrics.following_count.value,
      likes: {
        total: data.result.report.metrics.likes_count.value,
        avg: data.result.report.metrics.alikes_avg.value,
      },
      comments: {
        total: data.result.report.metrics.comments_count.performance.all.value,
        avg: data.result.report.metrics.comments_avg.value,
      },
      shares: {
        total: data.result.report.metrics.shares_count.performance.all.value,
        avg: data.result.report.metrics.shares_avg.value,
      },
      reachability: {
        total: data.result.report.metrics.audience_reachability.value,
      },
      demographyByAge,
      posts,
      lastPost: {
        basic: lastPost.basic,
        metrics: {
          views_count: lastPost.metrics.views_count.value,
          likes_count: lastPost.metrics.likes_count.value,
          comments_count: lastPost.metrics.comments_count.value,
          shares_count: lastPost.metrics.shares_count.value,
        },
      },
      followersChart: {
        labels: followersChart.labels.reverse(),
        values: followersChart.values.reverse(),
      },
      engagementRate: {
        labels: er.labels.reverse(),
        values: er.values.reverse(),
      },
    });
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 404 });
  }
}

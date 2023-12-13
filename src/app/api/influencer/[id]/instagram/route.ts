import executeQuery from "@/lib/db";
import { Influencer } from "../route";

export async function GET(req: Request) {
  try {
    const slug = req.url.split("influencer/")[1].split("/")[0];
    const result = (await executeQuery({
      query: "SELECT * FROM influenciadores_mk_digital_att WHERE slug = ?",
      values: [slug],
    })) as Influencer[];

    const instagramAccount = result[0].instagram_username;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token":
        "$2y$04$qoboZYiJNVt0ee/cG/GYMOrVG1Livi9ozZA1CSmNUPhqca7ryMZeG",
      "X-Auth-Id": "2077196",
    };
    const hypeURL = `https://hypeauditor.com/api/method/auditor.report/?username=${instagramAccount}&features={featuresList}&v=2`;
    const res = await fetch(hypeURL, {
      headers,
    });

    const hypeMediaURL = `https://hypeauditor.com/api/method/auditor.reportMedia/?username=${instagramAccount}`;
    const resMedia = await fetch(hypeMediaURL, {
      headers,
    });

    const data = await res.json();
    const mediaData = await resMedia.json();
    const user = data.result.user;
    const media = mediaData.result.media;

    const posts = [] as any;
    await Promise.all(
      Object.keys(media).map(async (mediaId: any, index: number) => {
        if (index > 3) {
          return;
        }
        const postData = media[mediaId];
        posts.push({
          basic: {
            ...postData.basic,
            date: postData.basic.time_posted,
          },
          metrics: {
            views: postData.metrics.video_views_count,
            likes: postData.metrics.likes_count,
            comments: postData.metrics.comments_count,
          },
        });
      })
    );

    const demographyByAge = {
      male: user.demography_by_age[0].value || 0,
      female: user.demography_by_age[1].value || 0,
      labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [],
    } as any;
    const demographyByAgeMale = user.demography_by_age[0].by_age_group;
    const demographyByAgeFemale = user.demography_by_age[1].by_age_group;

    await Promise.all(
      demographyByAgeMale.map(async (_: any, index: number) => {
        demographyByAge.values[index] = Math.round(
          demographyByAgeMale[index].value + demographyByAgeFemale[index].value
        );
      })
    );

    const audienceGeography = {
      countries: { labels: [], values: [] },
      cities: { labels: [], values: [] },
    } as any;

    await Promise.all(
      user.audience_geography.countries.map((country: any) => {
        audienceGeography.countries.labels.push(country.name);
        audienceGeography.countries.values.push(country.value);
      })
    );

    await Promise.all(
      user.audience_geography.cities.map((city: any) => {
        audienceGeography.cities.labels.push(city.name);
        audienceGeography.cities.values.push(city.value);
      })
    );

    const languages = { labels: [], values: [] } as any;
    await Promise.all(
      user.audience_languages.map((language: any) => {
        languages.labels.push(language.code.toUpperCase());
        languages.values.push(language.value);
      })
    );

    const followersChart = { labels: [], values: [] } as any;
    const followersChartData = user.followers_chart.slice(0, 30);

    await Promise.all(
      followersChartData.map((data: any) => {
        followersChart.labels.push(
          new Date(data.date * 1000).toLocaleDateString("pt-BR")
        );
        followersChart.values.push(data.count);
      })
    );

    const er = { labels: [], values: [] } as any;
    const engagementRate = user.er.performance;
    await Promise.all(
      Object.keys(engagementRate).map((period: any) => {
        if (period === "all") return;
        er.labels.push(period);
        er.values.push(engagementRate[period].value);
      })
    );

    const audienceInterests = { labels: [], values: [] } as any;
    const audienceInterestsData = user.audience_interests;
    await Promise.all(
      audienceInterestsData.map((interest: any) => {
        audienceInterests.labels.push(interest[0]);
        audienceInterests.values.push(interest[1]);
      })
    );

    return Response.json({
      followersCount: user.followers_count,
      followingsCount: user.followings_count,
      reach: {
        postReachNumber: user.blogger_reach.reach,
        storiesReachNumber: user.blogger_reach.stories_reach,
      },
      likesSpread: {
        title: user.likes_spread.title,
        avg: user.likes_spread.avg,
        value: user.likes_spread.value,
      },
      education: {
        noEducation: user.audience_education.no_education,
        incompletePrimary: user.audience_education.incomplete_primary,
        primary: user.audience_education.primary,
        lowerSecondary: user.audience_education.lower_secondary,
        upperSecondary: user.audience_education.upper_secondary,
        postSecondary: user.audience_education.post_secondary,
      },
      location: user.location,
      gender: user.demography,
      comments: {
        avgComments: user.avg_comments,
        likesCommentsRatioStatus: user.likes_comments_ratio.title,
        likesCommentsRatioChart: user.likes_comments_ratio_chart,
      },
      lastPost: {
        basic: posts[0].basic,
        metrics: {
          views_count: posts[0].metrics.views,
          likes_count: posts[0].metrics.likes,
          comments_count: posts[0].metrics.comments,
        },
      },
      posts,
      demographyByAge,
      audienceGeography,
      languages,
      followersChart: {
        labels: followersChart.labels.reverse(),
        values: followersChart.values.reverse(),
      },
      engagementRate: er,
      audienceInterests,
    });
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 404 });
  }
}

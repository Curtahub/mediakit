import executeQuery from "@/lib/db";
import { Influencer } from "../route";

export async function GET(req: Request) {
  try {
    const slug = req.url.split("influencer/")[1].split("/")[0];
    const result = (await executeQuery({
      query: "SELECT * FROM influenciadores_mk_digital_att WHERE slug = ?",
      values: [slug],
    })) as Influencer[];

    const ytAccount = result[0].yt_username;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token":
        "$2y$04$qoboZYiJNVt0ee/cG/GYMOrVG1Livi9ozZA1CSmNUPhqca7ryMZeG",
      "X-Auth-Id": "2077196",
    };
    const hypeURL = `https://hypeauditor.com/api/method/auditor.youtube/?channel=${ytAccount}`;
    const res = await fetch(hypeURL, {
      headers,
    });

    const data = await res.json();

    const subscribersCount = data.result.report.metrics.subscribers_count;

    const followersChart = { labels: [], values: [] } as any;
    await Promise.all(
      Object.keys(subscribersCount.performance).map((period: any) => {
        if (period === "all") return;
        followersChart.labels.push(period);
        followersChart.values.push(subscribersCount.performance[period].value);
      })
    );

    const er = { labels: [], values: [] } as any;
    const engagementRate = data.result.report.metrics.er.performance;
    await Promise.all(
      Object.keys(engagementRate).map((period: any) => {
        if (period === "all") return;
        er.labels.push(period);
        er.values.push(engagementRate[period].value);
      })
    );

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

    const audienceGeography = {
      countries: { labels: [], values: [] },
    } as any;

    await Promise.all(
      data.result.report.features.audience_geo.data.map((country: any) => {
        audienceGeography.countries.labels.push(country.title.toUpperCase());
        audienceGeography.countries.values.push(country.prc);
      })
    );

    const languages = { labels: [], values: [] } as any;
    let ytLanguages = data?.result?.report?.features?.audience_languages?.data;
    if (Object.keys(ytLanguages).length === 0) {
      ytLanguages = [];
    }
    await Promise.all(
      ytLanguages.map((language: any) => {
        languages.labels.push(language.title.toUpperCase());
        languages.values.push(language.prc);
      })
    );

    const views = { labels: [], values: [] } as any;
    const viewsPerformance = data.result.report.metrics.views_count.performance;
    await Promise.all(
      Object.keys(viewsPerformance).map((period: any) => {
        if (period === "all") return;
        views.labels.push(period);
        views.values.push(viewsPerformance[period].value);
      })
    );

    return Response.json({
      followersCount: subscribersCount.value,
      viewsCount: data.result.report.metrics.views_count.value,
      followersChart: {
        labels: followersChart.labels,
        values: followersChart.values,
      },
      engagementRate: er,
      demographyByAge,
      audienceGeography,
      languages,
      views,
    });
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 404 });
  }
}

import executeQuery from "@/lib/db";

type Influencer = {
  id: number;
  name: string;
  description: string;
  instagram_username: string;
  yt_username: string;
  tiktok_username: string;
  slug: string;
  picture: string;
};

export async function GET(req: Request) {
  try {
    const slug = req.url.split("influencer/")[1].split("/")[0];
    const result = (await executeQuery({
      query: "SELECT * FROM influenciadores_mkdigital WHERE slug = ?",
      values: [slug],
    })) as Influencer[];

    const ytAccount = result[0].yt_username;
    const instagramAccount = result[0].instagram_username;
    const tiktokAccount = result[0].tiktok_username;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token":
        "$2y$04$qoboZYiJNVt0ee/cG/GYMOrVG1Livi9ozZA1CSmNUPhqca7ryMZeG",
      "X-Auth-Id": "2077196",
    };

    const hypeYTURL = `https://hypeauditor.com/api/method/auditor.youtube/?channel=${ytAccount}`;
    const resYT = await fetch(hypeYTURL, {
      headers,
    });

    const hypeInstagramURL = `https://hypeauditor.com/api/method/auditor.report/?username=${instagramAccount}&features={featuresList}&v=2`;
    const resInstagram = await fetch(hypeInstagramURL, {
      headers,
    });

    const hypeTikTokURL = `https://hypeauditor.com/api/method/auditor.tiktok/?channel=${tiktokAccount}`;
    const resTikTok = await fetch(hypeTikTokURL, {
      headers,
    });

    const dataYT = await resYT.json();
    const dataInstagram = await resInstagram.json();
    const dataTiktok = await resTikTok.json();

    const ytAgeGenderData =
      dataYT.result.report.features.audience_age_gender.data;
    const tiktokAgeGenderData =
      dataTiktok.result.report.features.audience_age_gender.data;
    const demographyByAge = {
      male: 0,
      female: 0,
      labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [],
    } as any;

    await Promise.all(
      Object.keys(ytAgeGenderData).map((age: any, index: number) => {
        let ageCount = 0;
        Object.keys(ytAgeGenderData[age]).map((ageNumber: any) => {
          ageCount += ytAgeGenderData[age][ageNumber];
        });
        Object.keys(tiktokAgeGenderData[age]).map((ageNumber: any) => {
          ageCount += tiktokAgeGenderData[age][ageNumber];
        });
        demographyByAge.male +=
          ytAgeGenderData[age]["male"] + tiktokAgeGenderData[age]["male"];
        demographyByAge.female +=
          ytAgeGenderData[age]["female"] + tiktokAgeGenderData[age]["female"];
        demographyByAge.values[index] = ageCount;
      })
    );

    demographyByAge.male =
      demographyByAge.male +
      dataInstagram.result.user.demography_by_age[0].value;
    demographyByAge.female =
      demographyByAge.female +
      dataInstagram.result.user.demography_by_age[1].value;

    const demographyByAgeMale =
      dataInstagram.result.user.demography_by_age[0].by_age_group;
    const demographyByAgeFemale =
      dataInstagram.result.user.demography_by_age[1].by_age_group;
    await Promise.all(
      demographyByAgeMale.map(async (_: any, index: number) => {
        demographyByAge.values[index] =
          demographyByAge.values[index] +
          Math.round(
            demographyByAgeMale[index].value +
              demographyByAgeFemale[index].value
          );
      })
    );

    demographyByAge.male = Math.round(demographyByAge.male / 3);
    demographyByAge.female = Math.round(demographyByAge.female / 3);
    const data = await Promise.all(
      demographyByAge["values"].map((value: number) => value / 3)
    );
    demographyByAge["values"] = data;

    const countries = {
      labels: ["BR", "PT", "US", "Outros"],
      values: [0, 0, 0, 0],
    } as any;

    await Promise.all(
      dataInstagram.result.user.audience_geography.countries.map(
        (country: any) => {
          if (country.code === "BR") {
            countries.values[0] += country.value;
          } else if (country.code === "PT") {
            countries.values[1] += country.value;
          } else if (country.code === "US") {
            countries.values[2] += country.value;
          } else {
            countries.values[3] += country.value;
          }
        }
      )
    );

    await Promise.all(
      dataTiktok.result.report.features.audience_geo.data.countries.map(
        (country: any) => {
          if (country.code.toUpperCase() === "BR") {
            countries.values[0] += country.prc;
          } else if (country.code.toUpperCase() === "PT") {
            countries.values[1] += country.prc;
          } else if (country.code.toUpperCase() === "US") {
            countries.values[2] += country.prc;
          } else {
            countries.values[3] += country.prc;
          }
        }
      )
    );

    await Promise.all(
      dataYT.result.report.features.audience_geo.data.map((country: any) => {
        if (country.title.toUpperCase() === "BR") {
          countries.values[0] += country.prc;
        } else if (country.title.toUpperCase() === "PT") {
          countries.values[1] += country.prc;
        } else if (country.title.toUpperCase() === "US") {
          countries.values[2] += country.prc;
        } else {
          countries.values[3] += country.prc;
        }
      })
    );

    const audienceGeographyValues = await Promise.all(
      countries.values.map((value: number) => value / 3)
    );
    countries.values = audienceGeographyValues;

    const languages = {
      labels: ["PT", "EN", "ES", "Outros"],
      values: [0, 0, 0, 0],
    } as any;
    await Promise.all(
      dataInstagram.result.user.audience_languages.map((language: any) => {
        if (language.code.toUpperCase() === "PT") {
          languages.values[0] += language.value;
        } else if (language.code.toUpperCase() === "EN") {
          languages.values[1] += language.value;
        } else if (language.code.toUpperCase() === "ES") {
          languages.values[2] += language.value;
        } else {
          languages.values[3] += language.value;
        }
      })
    );

    await Promise.all(
      dataTiktok.result.report.features.audience_languages.data.map(
        (language: any) => {
          if (language.title.toUpperCase() === "PT") {
            languages.values[0] += language.prc;
          } else if (language.title.toUpperCase() === "EN") {
            languages.values[1] += language.prc;
          } else if (language.title.toUpperCase() === "ES") {
            languages.values[2] += language.prc;
          } else {
            languages.values[3] += language.prc;
          }
        }
      )
    );

    await Promise.all(
      dataYT.result.report.features.audience_languages.data.map(
        (language: any) => {
          if (language.title.toUpperCase() === "PT") {
            languages.values[0] += language.prc;
          } else if (language.title.toUpperCase() === "EN") {
            languages.values[1] += language.prc;
          } else if (language.title.toUpperCase() === "ES") {
            languages.values[2] += language.prc;
          } else {
            languages.values[3] += language.prc;
          }
        }
      )
    );

    const languagesValues = await Promise.all(
      languages.values.map((value: number) => value / 3)
    );
    languages.values = languagesValues;

    const bloggerReach = dataInstagram.result.user.blogger_reach.reach || 0;

    return Response.json({
      demographyByAge,
      countries,
      languages,
      instagram: {
        reach: bloggerReach,
        followersCount: dataInstagram.result.user.followers_count || 0,
        engagementRate: dataInstagram.result.user.er.value || 0,
        impressions: dataInstagram.result.user.audience_reachability.value || 0,
      },
      youtube: {
        reach:
          dataYT.result.report.metrics.views_avg.performance.all.value || 0,
        followersCount:
          dataYT.result.report.metrics.subscribers_count.value || 0,
        engagementRate:
          dataYT.result.report.metrics.er.performance.all.value || 0,
        impressions:
          dataYT.result.report.metrics.reactions_rate.performance.all.value ||
          0,
      },
      tiktok: {
        reach:
          dataTiktok.result.report.metrics.audience_reachability.value || 0,
        followersCount:
          dataTiktok.result.report.metrics.subscribers_count.value || 0,
        engagementRate: dataTiktok.result.report.metrics.er.value || 0,
        impressions:
          dataTiktok.result.report.metrics.audience_reachability.value || 0,
      },
    });
  } catch (error) {
    return Response.json({ error: "Influencer not found" });
  }
}

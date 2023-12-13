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

    let ageGenderDivider = 0;
    const ytAgeGenderData =
      dataYT?.result?.report?.features?.audience_age_gender?.data || {};
    const tiktokAgeGenderData =
      dataTiktok?.result?.report?.features?.audience_age_gender?.data || {};
    const demographyByAge = {
      male: 0,
      female: 0,
      labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [0, 0, 0, 0, 0, 0, 0],
    } as any;

    if (Object.keys(ytAgeGenderData).length > 0) {
      ageGenderDivider += 1;
      await Promise.all(
        Object.keys(ytAgeGenderData).map((age: any, index: number) => {
          let ageCount = 0;
          Object.keys(ytAgeGenderData[age]).map((ageNumber: any) => {
            ageCount += ytAgeGenderData[age][ageNumber];
          });
          demographyByAge.male += ytAgeGenderData[age]["male"];
          demographyByAge.female += ytAgeGenderData[age]["female"];
          demographyByAge.values[index] += ageCount;
        })
      );
    }

    if (Object.keys(tiktokAgeGenderData).length > 0) {
      ageGenderDivider += 1;
      await Promise.all(
        Object.keys(tiktokAgeGenderData).map((age: any, index: number) => {
          let ageCount = 0;
          Object.keys(tiktokAgeGenderData[age]).map((ageNumber: any) => {
            ageCount += tiktokAgeGenderData[age][ageNumber];
          });
          demographyByAge.male += tiktokAgeGenderData[age]["male"];
          demographyByAge.female += tiktokAgeGenderData[age]["female"];
          demographyByAge.values[index] += ageCount;
        })
      );
    }

    if (!dataInstagram.error) {
      demographyByAge.male =
        demographyByAge.male +
          dataInstagram?.result?.user?.demography_by_age[0]?.value || 0;

      demographyByAge.female =
        demographyByAge?.female +
          dataInstagram?.result?.user?.demography_by_age[1]?.value || 0;

      const demographyByAgeMale =
        dataInstagram?.result?.user?.demography_by_age[0]?.by_age_group || [];
      const demographyByAgeFemale =
        dataInstagram?.result?.user?.demography_by_age[1]?.by_age_group || [];

      if (demographyByAgeMale.length > 0) {
        ageGenderDivider += 1;
      }
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
    }

    demographyByAge.male = Math.round(demographyByAge.male / ageGenderDivider);
    demographyByAge.female = Math.round(
      demographyByAge.female / ageGenderDivider
    );
    const data = await Promise.all(
      demographyByAge["values"].map((value: number) => value / ageGenderDivider)
    );
    demographyByAge["values"] = data;

    let countriesDivider = 0;
    const countries = {
      labels: ["BR", "PT", "US", "Outros"],
      values: [0, 0, 0, 0],
    } as any;

    const InstagramCountries =
      dataInstagram?.result?.user?.audience_geography?.countries || [];
    if (InstagramCountries.length > 0) {
      countriesDivider += 1;
    }
    await Promise.all(
      InstagramCountries.map((country: any) => {
        if (country.code === "BR") {
          countries.values[0] += country.value;
        } else if (country.code === "PT") {
          countries.values[1] += country.value;
        } else if (country.code === "US") {
          countries.values[2] += country.value;
        } else {
          countries.values[3] += country.value;
        }
      })
    );

    const tikTokCountries =
      dataTiktok?.result?.report?.features?.audience_geo?.data?.countries || [];
    if (tikTokCountries.length > 0) {
      countriesDivider += 1;
    }
    await Promise.all(
      tikTokCountries.map((country: any) => {
        if (country.code.toUpperCase() === "BR") {
          countries.values[0] += country.prc;
        } else if (country.code.toUpperCase() === "PT") {
          countries.values[1] += country.prc;
        } else if (country.code.toUpperCase() === "US") {
          countries.values[2] += country.prc;
        } else {
          countries.values[3] += country.prc;
        }
      })
    );

    const ytCountries =
      dataYT?.result?.report?.features?.audience_geo?.data || [];
    if (ytCountries.length > 0) {
      countriesDivider += 1;
    }
    await Promise.all(
      ytCountries.map((country: any) => {
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
      countries.values.map((value: number) => value / countriesDivider)
    );
    countries.values = audienceGeographyValues;

    let languagesDivider = 0;
    const languages = {
      labels: ["PT", "EN", "ES", "Outros"],
      values: [0, 0, 0, 0],
    } as any;
    const instagramLanguage =
      dataInstagram?.result?.user?.audience_languages || [];
    if (instagramLanguage.length > 0) {
      languagesDivider += 1;
    }

    await Promise.all(
      instagramLanguage.map((language: any) => {
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

    const tikTokLanguage =
      dataTiktok?.result?.report?.features?.audience_languages?.data || [];
    if (tikTokLanguage.length > 0) {
      languagesDivider += 1;
    }
    await Promise.all(
      tikTokLanguage.map((language: any) => {
        if (language.title.toUpperCase() === "PT") {
          languages.values[0] += language.prc;
        } else if (language.title.toUpperCase() === "EN") {
          languages.values[1] += language.prc;
        } else if (language.title.toUpperCase() === "ES") {
          languages.values[2] += language.prc;
        } else {
          languages.values[3] += language.prc;
        }
      })
    );

    let ytLanguage =
      dataYT?.result?.report?.features?.audience_languages?.data || [];
    if (Object.keys(ytLanguage).length === 0) {
      ytLanguage = [];
    }
    if (ytLanguage.length > 0) {
      languagesDivider += 1;
    }

    await Promise.all(
      ytLanguage.map((language: any) => {
        if (language.title.toUpperCase() === "PT") {
          languages.values[0] += language.prc;
        } else if (language.title.toUpperCase() === "EN") {
          languages.values[1] += language.prc;
        } else if (language.title.toUpperCase() === "ES") {
          languages.values[2] += language.prc;
        } else {
          languages.values[3] += language.prc;
        }
      })
    );

    const languagesValues = await Promise.all(
      languages.values.map((value: number) => value / languagesDivider)
    );
    languages.values = languagesValues;

    const bloggerReach = dataInstagram?.result?.user?.blogger_reach?.reach || 0;

    return Response.json({
      demographyByAge,
      countries,
      languages,
      instagram: {
        reach: bloggerReach,
        followersCount: dataInstagram?.result?.user?.followers_count || 0,
        engagementRate: dataInstagram?.result?.user?.er?.value || 0,
        impressions:
          dataInstagram?.result?.user?.audience_reachability?.value || 0,
      },
      youtube: {
        reach:
          dataYT?.result?.report?.metrics?.views_avg?.performance?.all?.value ||
          0,
        followersCount:
          dataYT?.result?.report?.metrics?.subscribers_count?.value || 0,
        engagementRate:
          dataYT?.result?.report?.metrics?.er?.performance?.all?.value || 0,
        impressions:
          dataYT?.result?.report?.metrics?.reactions_rate?.performance?.all
            ?.value || 0,
      },
      tiktok: {
        reach:
          dataTiktok?.result?.report?.metrics?.audience_reachability?.value ||
          0,
        followersCount:
          dataTiktok?.result?.report?.metrics?.subscribers_count?.value || 0,
        engagementRate: dataTiktok?.result?.report?.metrics?.er?.value || 0,
        impressions:
          dataTiktok?.result?.report?.metrics?.audience_reachability?.value ||
          0,
      },
    });
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 404 });
  }
}

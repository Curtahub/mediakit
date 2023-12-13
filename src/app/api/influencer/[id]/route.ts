import executeQuery from "@/lib/db";

export type Influencer = {
  id: number;
  name: string;
  description?: string;
  instagram_username?: string;
  yt_username?: string;
  tiktok_username?: string;
  x_username?: string;
  facebook_username?: string;
  twitch_username?: string;
  slug?: string;
  picture: string;
  picture_u: string;
  date_of_birth: string;
  city?: string;
  uf?: string;
};

export async function GET(req: Request) {
  const slug = req.url.split("influencer/")[1];
  const result = (await executeQuery({
    query: "SELECT * FROM influenciadores_mk_digital_att WHERE slug = ?",
    values: [slug],
  })) as Influencer[];

  if (!result[0]) {
    return Response.json({ error: "Influencer not found" }, { status: 404 });
  }
  return Response.json({ data: result[0] });
}

export async function GET() {
  const res = await fetch(
    "https://hypeauditor.com/api/method/auditor.report/?username=rodrigo.mussi&features={featuresList}&v=2",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token":
          "$2y$04$qoboZYiJNVt0ee/cG/GYMOrVG1Livi9ozZA1CSmNUPhqca7ryMZeG",
        "X-Auth-Id": "2077196",
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}

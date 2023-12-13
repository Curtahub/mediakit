"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { Influencer } from "../api/influencer/[id]/route";
import { Profile } from "../components/Profile/Profile";
import { About } from "../components/About/About";
import { Impressions } from "../components/Impressions/Impressions";
import { Analytics } from "../components/Analytics/Analytics";
import { Loading } from "../components/Loading/Loading";
import { ThemeProvider } from "next-themes";

async function fetchInfluencer(slug: string) {
  const res = await fetch(`/api/influencer/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function fetchSummaryData(slug: string) {
  const res = await fetch(`/api/influencer/${slug}/summary`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageError, setPageError] = useState<boolean>(false);
  const [influencer, setInfluencer] = useState<Influencer>();
  const [summary, setSummary] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const data = await fetchInfluencer(params.slug);
      const summary = await fetchSummaryData(params.slug);
      setInfluencer(data.data);
      setSummary(summary);
      setLoading(false);
    } catch (err) {
      setPageError(true);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full flex-col justify-center items-center gap-[30px]">
        <Image
          src="/curta-logo.svg"
          alt="Curta logo"
          width={200}
          height={200}
        />
        <Loading />
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <Image
          src="/curta-logo.svg"
          alt="Curta logo"
          width={200}
          height={200}
        />
        <p className="text-[20px] font-semibold text-center mt-[40px]">
          Ops, não encontramos esse influencer
        </p>
      </div>
    );
  }

  if (!influencer) return;

  return (
    <ThemeProvider>
      <div className="flex flex-1 flex-col bg-[#f1f4fa] dark:bg-[#111] h-fit">
        <NavBar />
        <div className="flex flex-1 flex-col gap-[24px] px-8 py-[40px] h-screen w-screen">
          <div className="flex flex-1 flex-col md:flex-row gap-[24px]">
            <Profile influencer={influencer} />
            <div className="flex flex-1 flex-col gap-[24px]">
              <About description={influencer.description} />
              <Impressions data={summary} />
            </div>
          </div>
          <Analytics influencer={influencer} summary={summary} />
        </div>
        <div className="flex flex-1 flex-col justify-center items-center mb-8 gap-[12px] mt-12">
          <span className="text-[#101010] dark:text-[#D9D9D9] text-[12px] font-semibold">
            Powered by Curta Digital. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </ThemeProvider>
  );
}

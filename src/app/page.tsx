import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 h-full items-center justify-center">
      <Image src="/curta-logo.svg" alt="Logo" width={200} height={200} />
    </main>
  );
}

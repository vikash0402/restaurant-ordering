import prisma from "@/lib/prisma";
import GenerateScanner from "./components/qrGenerator";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        QR for Menu
      </h1>
      <GenerateScanner />
    </div>
  );
}

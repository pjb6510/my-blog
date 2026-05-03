import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <TopBar />
      <div className="flex-1 md:grid md:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-w-0 px-6 py-12 md:px-12 md:py-16">{children}</main>
      </div>
    </div>
  );
}

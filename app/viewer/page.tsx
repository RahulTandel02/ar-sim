import ParanomaViewer from "@/components/ParanomaViewer";
import { Suspense } from "react";
// import dynamic from "next/dynamic";

export default function ViewerPage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <PanoramaViewer /> */}
        <ParanomaViewer />
      </Suspense>
    </main>
  );
}

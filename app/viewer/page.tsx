import ParanomaViewer from "@/components/ParanomaViewer";
import { Suspense } from "react";
// import dynamic from "next/dynamic";

export default function ViewerPage() {
  return (
    <main className="w-full h-screen relative">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <PanoramaViewer /> */}
        <ParanomaViewer />
      </Suspense>
    </main>
  );
}

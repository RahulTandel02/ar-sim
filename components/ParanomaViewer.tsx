"use client";
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef } from "react";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useSearchParams } from "next/navigation";
import { data } from "../app/data";
import { useRouter } from "next/navigation";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";

export default function ParanomaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!containerRef.current) return;

    const selectedData = data.find((item: any) => +item.id === +id!);

    const viewer = new Viewer({
      container: containerRef.current!,
      panorama: selectedData?.image || "/project1/01.jpg",
      defaultZoomLvl: 50,
      defaultYaw: "0deg",

      navbar: false,
      plugins: [
        MarkersPlugin.withConfig({
          markers: selectedData?.markers || [],
        }),
        AutorotatePlugin.withConfig({
          autorotateSpeed: "2rpm",
          autostartOnIdle: false,
        }),
      ],
    });

    const markersPlugin = viewer.getPlugin(MarkersPlugin);

    viewer.addEventListener("click", ({ data }) => {
      console.log({ yaw: data.yaw, pitch: data.pitch });
    });
    viewer.addEventListener("ready", () => {
      markersPlugin.addEventListener("select-marker", (e) => {
        if (e.doubleClick) {
          const id = e.marker.id.split("-")[1];
          router.push(`viewer/?id=${id}`);
        }
      });
    });

    return () => {
      viewer.destroy();
    };
  }, [id]);

  return (
    <>
      <div ref={containerRef} className="w-full h-screen overflow-hidden">
        <div className="absolute top-0 w-full h-screen z-10 pointer-events-none">
          <div className="p-4 top-0 left-0">
            <h2 className="mb-2 text-2xl font-bold text-white bg-opacity-50 px-6 py-3 rounded-lg">
              View
            </h2>
            <span className="text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg">
              Current Status
            </span>
          </div>
          <div className="absolute bottom-0 left-0 p-4 flex justify-between w-full">
            <h1 className="text-white text-2xl font-bold">LOGO</h1>
            <div>
              <nav className="flex gap-4">
                <button className="viewer-buttons">Contact</button>
                <button className="viewer-buttons">Address</button>
                <button className="viewer-buttons">Brochure</button>
                <button className="viewer-buttons">Photos</button>
                <button className="viewer-buttons">Video</button>
                <button className="viewer-buttons">Floorplan</button>
              </nav>
            </div>
            <div>
              <button className="viewer-buttons">+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

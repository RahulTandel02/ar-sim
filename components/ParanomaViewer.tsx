"use client";
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef, useState } from "react";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useSearchParams } from "next/navigation";
import { data } from "../app/data";
import { useRouter } from "next/navigation";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import Image from "next/image";
import Link from "next/link";

export default function ParanomaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canShowViewer, setCanShowViewer] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const numberMarkers = [
    { id: 1, left: 10, top: 41 },
    { id: 2, left: 48, top: 40 },
    { id: 3, left: 47, top: 10 },
    { id: 4, left: 62, top: 39 },
    { id: 5, left: 61, top: 15 },
    { id: 6, left: 67, top: 80 },
    { id: 7, left: 78, top: 88 },
    { id: 8, left: 77.5, top: 65 },
    { id: 9, left: 90, top: 97 },
    { id: 10, left: 89.5, top: 68 },
  ];

  useEffect(() => {
    const updateViewerAvailability = () => {
      const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      setCanShowViewer(!isMobileOrTablet || !isPortrait);
    };

    updateViewerAvailability();
    window.addEventListener("resize", updateViewerAvailability);
    window.addEventListener("orientationchange", updateViewerAvailability);

    return () => {
      window.removeEventListener("resize", updateViewerAvailability);
      window.removeEventListener("orientationchange", updateViewerAvailability);
    };
  }, []);

  useEffect(() => {
    if (!canShowViewer || id === "0" || !containerRef.current) return;

    const selectedData = data.find((item) => item.id === Number(id));

    const viewer = new Viewer({
      container: containerRef.current!,
      panorama: selectedData?.image || "/project1/01.jpg",
      defaultZoomLvl: 50,
      panoData: {
        fullWidth: 7680,
        fullHeight: 3840,
        croppedWidth: 7680,
        croppedHeight: 3840,
        croppedX: 0,
        croppedY: 0,
      },
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
        if (e.marker.id) {
          const id = e.marker.id.split("-")[1];
          router.push(`viewer/?id=${id}`);
        }
      });
    });

    return () => {
      viewer.destroy();
    };
  }, [canShowViewer, id, router]);

  const handleClick = (id: number) => {
    router.push(`viewer/?id=${id}`);
  };

  if (!canShowViewer) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-primary-600 px-6 text-center text-white">
        <div className="max-w-sm">
          <div className="mx-auto mb-5 flex h-16 w-24 items-center justify-center rounded-xl border-2 border-white/70">
            <div className="h-8 w-12 rounded-md border-2 border-white/70" />
          </div>
          <h1 className="text-2xl font-bold">Rotate your device</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            The panorama viewer is available in landscape mode on mobile and
            tablet screens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {id === "0" && (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div
            className="relative max-h-full"
            style={{
              aspectRatio: "1960 / 1080",
              width: "min(100vw, calc(100dvh * 1960 / 1080))",
            }}
          >
            <Image
              src="/project1/main02.jpg"
              alt="Main Image"
              fill
              preload
              sizes="100vw"
              className="object-contain"
            />

            <div className="absolute inset-0">
              {numberMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className="absolute"
                  onClick={() => handleClick(marker.id)}
                  style={{
                    left: `${marker.left}%`,
                    top: `${marker.top}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <div
                    className="relative h-[clamp(24px,3vw,40px)] w-[clamp(24px,3vw,40px)] text-white"
                    style={{ color: "white" }}
                  >
                    <Image
                      src="/record-circle.svg"
                      alt={`Marker ${marker.id}`}
                      fill
                      sizes="30px"
                      className="text-white"
                      style={{ color: "white" }}
                    />
                    {/* <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                    {marker.id}
                  </span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {id !== "0" && (
        <div ref={containerRef} className="h-full w-full overflow-hidden"></div>
      )}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <Link
            href="/viewer?id=0"
            aria-label="Open property map"
            className="viewer-buttons viewer-map-button"
          >
            <span className="viewer-map-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Map
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-2 p-3 sm:gap-3 sm:p-4">
          <div className="pointer-events-auto flex h-[clamp(2.25rem,7vw,3.25rem)] w-[clamp(4.75rem,14vw,8rem)] items-center justify-center rounded-md bg-white/95 px-2 py-1 shadow-lg backdrop-blur-sm sm:px-3">
            <Image
              src="/logo.png"
              className="h-auto max-h-full w-full object-contain"
              height={80}
              width={204}
              sizes="(max-width: 768px) 76px, 128px"
              alt="Logo"
            />
          </div>
          <div className="min-w-0">
            <nav className="pointer-events-auto flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-4">
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
  );
}

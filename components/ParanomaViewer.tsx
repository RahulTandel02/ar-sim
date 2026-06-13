"use client";
import { Viewer } from "@photo-sphere-viewer/core";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useSearchParams } from "next/navigation";
import { data } from "../app/data";
import { useRouter } from "next/navigation";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import Grid from "./Grid";

export default function ParanomaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canShowViewer, setCanShowViewer] = useState(false);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotatePluginRef = useRef<{
    start?: () => void;
    stop?: () => void;
  } | null>(null);

  const copyToClipboard = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(label ? `${label} copied` : `Copied`);
      setTimeout(() => setCopiedMessage(null), 2000);
    } catch (e) {
      setCopiedMessage("Unable to copy");
      setTimeout(() => setCopiedMessage(null), 2000);
    }
  };

  const selectedData = data.find((item) => item.id === Number(id));
  const floorPlanImage = id && +id <= 5 ? "/subplotA.png" : "/subplotb.png";

  async function toggleFullScreen() {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  const imageData = [
    { id: 1, src: "/photos/image01.jpg" },
    { id: 2, src: "/photos/image02.jpg" },
    { id: 3, src: "/photos/image03.jpg" },
    { id: 4, src: "/photos/image04.jpg" },
    { id: 5, src: "/photos/image05.jpg" },
    { id: 6, src: "/photos/image06.jpg" },
    { id: 7, src: "/photos/image07.jpg" },
  ];

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
          autostartDelay: 0,
        }),
      ],
    });

    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    const autoRotatePlugin = viewer.getPlugin(AutorotatePlugin) as unknown as {
      start?: () => void;
      stop?: () => void;
    } | null;
    autoRotatePluginRef.current = autoRotatePlugin;

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

      if (autoRotate) {
        autoRotatePlugin?.start?.();
      } else {
        autoRotatePlugin?.stop?.();
      }
    });

    return () => {
      autoRotatePluginRef.current = null;
      viewer.destroy();
    };
  }, [canShowViewer, id, router]);

  useEffect(() => {
    const plugin = autoRotatePluginRef.current;
    if (!plugin) return;

    if (autoRotate) {
      plugin.start?.();
    } else {
      plugin.stop?.();
    }
  }, [autoRotate]);

  const handleClick = (id: number) => {
    router.push(`viewer/?id=${id}`);
  };

  const handlePlusAction = (action: string) => {
    // placeholder actions - adapt as needed
    if (action === "fullscreen") {
      toggleFullScreen();
    } else if (action === "autoplay") {
      toggleAutoPlay();
    }
    setIsPlusOpen(false);
  };

  function toggleAutoPlay() {
    setAutoRotate((prev) => !prev);
  }

  function getModalData(source: string) {
    switch (source) {
      case "contact": {
        const phone = "+917016227187";
        const address = `Sidhi Industrial Park\n163/1, Near BIC Cello IND. NH NO. 48, Karambele - Vapi.`;

        return (
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2 3v6a2 2 0 0 0 2 2h2l2 3 3-1 3 3 1-3 3-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                  Contact
                </h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                  Get in touch or copy details to clipboard.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <a className="font-medium text-sky-500" href={`tel:${phone}`}>
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(phone, "Phone")}
                    className="rounded-md bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mt-3 border-t border-white/5 pt-3">
                <p className="text-xs text-slate-400">Address</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-200">
                  {address}
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => copyToClipboard(address, "Address")}
                    className="rounded-md bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600"
                  >
                    Copy address
                  </button>
                </div>
              </div>
            </div>

            {copiedMessage && (
              <div className="rounded-md bg-green-600/90 px-3 py-2 text-sm text-white">
                {copiedMessage}
              </div>
            )}
          </div>
        );
      }
      case "photos":
        return <Grid data={imageData} />;
      default:
        return null;
    }
  }

  function setModalData(source: string) {
    setModalContent(getModalData(source));
    setIsModalOpen(true);
  }

  // function au

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
    <>
      <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
        <div
          id="floor-plan-drawer"
          role="complementary"
          aria-label="Floor plan drawer"
          className={`pointer-events-auto fixed left-0 top-0 z-20 h-full bg-black/0 transition-transform duration-300 ease-in-out ${
            isFloorPlanOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isFloorPlanOpen}
        >
          <div className="pointer-events-auto flex h-full w-[min(90vw,380px)] max-w-[380px] flex-col bg-slate-950/95 shadow-2xl backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">Floor Plan</p>
                <p className="text-xs text-slate-300">
                  Tap the toggle to close
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => setIsFloorPlanOpen(false)}
                aria-label="Close floor plan drawer"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="mx-auto w-full max-w-[1000px] rounded-3xl border border-white/10 bg-slate-900 p-2">
                <Image
                  src={floorPlanImage}
                  alt="Property floor plan"
                  width={1200}
                  height={800}
                  className="mx-auto block max-w-full h-auto rounded-xl"
                  sizes="(max-width: 640px) 90vw, 380px"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="pointer-events-auto fixed left-0 top-1/2 z-30 -translate-y-1/2 rounded-r-full border border-white/15 bg-slate-900/90 px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          onClick={() => setIsFloorPlanOpen((prev) => !prev)}
          aria-expanded={isFloorPlanOpen}
          aria-controls="floor-plan-drawer"
        >
          {isFloorPlanOpen ? "Close" : "Floor Plan"}
        </button>

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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {id !== "0" && (
          <div
            ref={containerRef}
            className="h-full w-full overflow-hidden"
          ></div>
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
            <Link
              href="/"
              className="pointer-events-auto flex h-[clamp(2.25rem,7vw,3.25rem)] w-[clamp(4.75rem,14vw,8rem)] items-center justify-center rounded-md bg-white/95 px-2 py-1 shadow-lg backdrop-blur-sm sm:px-3"
            >
              <Image
                src="/logo.png"
                className="h-auto max-h-full w-full object-contain"
                height={80}
                width={204}
                sizes="(max-width: 768px) 76px, 128px"
                alt="Logo"
              />
            </Link>
            <div className="min-w-0">
              <nav className="pointer-events-auto flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-4">
                <button
                  className="viewer-buttons"
                  onClick={() => setModalData("contact")}
                >
                  Contact
                </button>
                <button
                  className="viewer-buttons"
                  onClick={() => setModalData("photos")}
                >
                  Photos
                </button>
                <Link
                  href="/floorplan.pdf"
                  target="__blank"
                  className="viewer-buttons"
                >
                  Floorplan
                </Link>
              </nav>
            </div>
            <div className="pointer-events-auto relative">
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isPlusOpen}
                  aria-controls="more-actions"
                  onClick={() => setIsPlusOpen((p) => !p)}
                  className="viewer-buttons inline-flex  items-center justify-center rounded-md"
                >
                  <span className="sr-only">
                    {isPlusOpen ? "Close actions" : "Open actions"}
                  </span>
                  <span aria-hidden="true">+</span>
                </button>

                <div
                  id="more-actions"
                  role="menu"
                  aria-hidden={!isPlusOpen}
                  className={`absolute right-0 bottom-full mb-3 flex w-max flex-col gap-2 transition-all duration-200 ease-in-out ${
                    isPlusOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => handlePlusAction("fullscreen")}
                    className="viewer-buttons"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-fullscreen"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => handlePlusAction("autoplay")}
                    className="viewer-buttons"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-right-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  </button>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => handlePlusAction("action3")}
                    className="viewer-buttons"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-music-note-beamed"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                      <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Contact"
        >
          {modalContent}
        </Modal>
      </>
    </>
  );
}

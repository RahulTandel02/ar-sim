import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="relative h-56 w-full sm:h-64 lg:h-70">
        <Image
          unoptimized
          fill
          className="h-full w-full object-cover"
          src="/project1/main.jpg"
          alt=""
        />
      </div>
      <div className="p-5">
        <span className="bg-primary-200/20 py-1 px-2 text-xs/6 text-primary-600 font-bold rounded-xl">
          COMMERCIAL
        </span>
        <h2 className="text-xl font-bold mt-2">Kuber Industrial Park</h2>
        <p className="text-gray-500 text-sm">Office Spaces</p>
        <div className="bg-primary-200/50 p-3 mt-2 border-l-4 border-primary-600 rounded-lg text-primary-600/80 text-sm font-medium">
          &quot;Refined Comfort&quot;
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[0.7rem] font-bold tracking-[0.14em] text-primary-200">
              VIEW DETAILS
            </span>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              Explore the interactive tour
            </p>
          </div>
          <Link
            href="/viewer?id=0"
            aria-label="View Kuber Industrial Park details"
            className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition duration-150 hover:bg-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
          >
            <span>View property</span>
            <span className="flex size-7 items-center justify-center rounded-md bg-white/15 transition group-hover:bg-white/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

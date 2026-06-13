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
        <div className="border-t-1 border-gray-200 mt-5 pt-3 flex justify-between items-center  ">
          <span className="text-xs text-gray-600 font-semibold">
            VIEW DETAILS
          </span>
          <Link
            href="/viewer?id=0"
            className="bg-primary-200/20 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-primary-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

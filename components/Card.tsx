import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-70">
        <Image
          unoptimized
          fill
          className="w-full h-full object-cover rounded-xl mb-5"
          src="https://images.unsplash.com/photo-1780042426982-cb794203ea1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DY"
          alt=""
        />
      </div>
      <div className="p-5">
        <span className="bg-primary-200/20 py-1 px-2 text-xs/6 text-primary-600 font-bold rounded-xl">
          RESIDENTIAL
        </span>
        <h2 className="text-xl font-bold mt-2">Kalash</h2>
        <p className="text-gray-500 text-sm">2 & 3 BHK Homes</p>
        <div className="bg-primary-200/50 p-3 mt-2 border-l-4 border-primary-600 rounded-lg text-primary-600/80 text-sm font-medium">
          "Refined Comfort"
        </div>
        <div className="border-t-1 border-gray-200 mt-5 pt-3 flex justify-between items-center  ">
          <span className="text-xs text-gray-600 font-semibold">
            VIEW DETAILS
          </span>
          <Link
            href="/viewer?id=1"
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

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-5 sm:mx-8 md:mx-10 lg:mx-15">
      <div className="bg-primary-600 -z-10 flex flex-col gap-6 rounded-xl px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-8">
        <div>
          <h2 className="text-xl font-bold text-white">
            Interested in Property?
          </h2>
          <span className="text-white/50 text-sm">
            Our team is ready to guide you to the perfect space.
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end">
          <Link
            href="https://wa.link/i01zb7"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary-600 shadow-sm transition duration-150 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary-600/10 transition group-hover:bg-primary-600/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </span>
            Contact Us
          </Link>
          <Link
            href="/viewer?id=0"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition duration-150 hover:border-white/40 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75 3.75 9v11.25L9 18m0-11.25 6 2.25m-6-2.25V18m6-9 5.25-2.25V18L15 20.25m0-11.25v11.25"
                />
              </svg>
            </span>
            View on Map
          </Link>
          {/* <Link  className="rounded-3xl border border-primary-200 px-5 py-2 text-primary-200 font-light">
            Share
          </Link> */}
        </div>
      </div>
      <div className="text-center py-2 text-gray-500/40 text-xs">
        2025 KUBER - CRAFTING EXCEPTIONAL SPACES. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

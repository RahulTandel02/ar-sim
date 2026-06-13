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
        <div className="grid gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-end">
          <button className="rounded-3xl bg-primary-200 px-5 py-2 text-white font-light">
            Book Site Visit
          </button>
          <button className="rounded-3xl border border-primary-200 px-5 py-2 text-primary-200 font-light">
            Contact Us
          </button>
          <button className="rounded-3xl border border-primary-200 px-5 py-2 text-primary-200 font-light">
            Contact Us
          </button>
        </div>
      </div>
      <div className="text-center py-2 text-gray-500/40 text-xs">
        2025 KUBER - CRAFTING EXCEPTIONAL SPACES. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

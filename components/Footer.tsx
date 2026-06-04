export default function Footer() {
  return (
    <footer className="mx-15">
      <div className="bg-primary-600 -z-10 flex items-center justify-between px-10 py-8 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white">
            Interested in Property?
          </h2>
          <span className="text-white/50 text-sm">
            Our team is ready to guide you to the perfect space.
          </span>
        </div>
        <div>
          <button className="bg-primary-200 px-5 py-2 rounded-3xl text-white font-light">
            Book Site Visit
          </button>
          <button className="ml-3 border border-primary-200 px-5 py-2 rounded-3xl text-primary-200 font-light">
            Contact Us
          </button>
          <button className="ml-3 border border-primary-200 px-5 py-2 rounded-3xl text-primary-200 font-light">
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

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="grid gap-4 border-b px-5 py-4 sm:px-8 md:grid-cols-[auto_1fr_auto] md:items-center md:px-10 lg:px-15">
      <div className="flex justify-center md:justify-start">
        <Image
          src="/logo.png"
          height={80}
          width={204}
          alt="Logo"
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 164px, 180px"
          className="h-auto w-[clamp(8.5rem,34vw,11.25rem)] object-contain"
          priority
        />
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm md:justify-center md:gap-6 md:text-base">
        <li>
          <a href="#" className="navbar-links">
            Projects
          </a>
        </li>
        <li>
          <a href="#" className="navbar-links">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="navbar-links">
            Locations
          </a>
        </li>
        <li>
          <a href="#" className="navbar-links">
            Contact
          </a>
        </li>
      </ul>

      <div className="flex md:justify-end">
        <button className="w-full rounded-3xl bg-primary-200 px-5 py-2 text-white font-light sm:w-auto">
          Book Site Visit
        </button>
      </div>
    </nav>
  );
}

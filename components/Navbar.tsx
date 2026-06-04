export default function Navbar() {
  return (
    <nav className="grid grid-cols-3 items-center px-15 py-4 border-b">
      <div>
        <h1 className="text-xl font-bold">LOGO</h1>
      </div>

      <ul className="flex justify-center gap-6">
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

      <div className="flex justify-end gap-3">
        <button className="bg-primary-200 px-5 py-2 rounded-3xl text-white font-light">
          Book Site Visit
        </button>
      </div>
    </nav>
  );
}

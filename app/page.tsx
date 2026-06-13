import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="bg-primary-600 text-white">
        <div className="px-5 py-8 sm:px-8 md:px-10 lg:px-15 lg:py-10">
          <h4 className="text-sm tracking-tighter mb-3">OUR PORTFOLIO</h4>
          <h1 className="my-2 text-3xl sm:text-4xl">Signature Properties</h1>
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-white/50 tracking-wide">
              Currated residential, commercial & industrial spaces
            </p>
            <select className="w-full rounded-md border border-white/20 bg-white px-3 py-2 text-primary-600 outline-none sm:w-auto">
              <option>All Properties</option>
              <option>1 BHK</option>
            </select>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 px-5 py-8 sm:px-8 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-10 lg:px-15 lg:py-10">
        <div className="text-xs text-primary-200 text-semibold tracking-wide md:col-span-2 lg:col-span-3">
          SHOWING 1 PROPERTIES
        </div>
        <Card />
      </section>
      <Footer />
    </>
  );
}

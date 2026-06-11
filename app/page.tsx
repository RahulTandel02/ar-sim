import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="bg-primary-600 text-white">
        <div className="px-15 py-10">
          <h4 className="text-sm tracking-tighter mb-3">OUR PORTFOLIO</h4>
          <h1 className="text-4xl my-2">Signature Properties</h1>
          <div className="flex justify-between text-sm">
            <p className="text-white/50 tracking-wide">
              Currated residential, commercial & industrial spaces
            </p>
            <select className="">
              <option>All Properties</option>
              <option>1 BHK</option>
            </select>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-10 px-15 py-10">
        <div className="col-span-3 text-xs text-primary-200 text-semibold tracking-wide">
          SHOWING 1 PROPERTIES
        </div>
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <Footer />
    </>
  );
}

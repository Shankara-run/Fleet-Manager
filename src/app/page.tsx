import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Booking from "@/components/Booking";
import Rides from "@/components/Rides";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <WhyChooseUs />
      <Booking />
      <Rides />
      <AppDownload />
      <Footer />
    </main>
  );
}

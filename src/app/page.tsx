import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FlashSales from "@/components/home/FlashSales";
import Categories from "@/components/home/Categories";
import BestSelling from "@/components/home/BestSelling";
import MusicBanner from "@/components/home/MusicBanner";
import ExploreProducts from "@/components/home/ExploreProducts";
import NewArrival from "@/components/home/NewArrival";
import Services from "@/components/home/Services";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Reveal>
          <FlashSales />
        </Reveal>
        <Reveal>
          <Categories />
        </Reveal>
        <Reveal>
          <BestSelling />
        </Reveal>
        <Reveal>
          <MusicBanner />
        </Reveal>
        <Reveal>
          <ExploreProducts />
        </Reveal>
        <Reveal>
          <NewArrival />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

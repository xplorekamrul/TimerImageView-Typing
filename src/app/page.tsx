import { AutoSlider } from "@/components/autoSlider";
import BackToTopButton from "@/components/backToTop";
import StickyHeader from "@/components/stickyHeader";
import TabsLightboxGallery from "@/components/tabs";
import CountdownTimer from "@/components/timerOpeningPaage";

export default function Home() {
  const slides = [
    { id: "slide1", image: "/ai (1)-min.jpg" }, // Blue
    { id: "slide2", image: "/ai (3)-min.jpg" }, // Green
    { id: "slide3", image: "/animal (1)-min.jpg" }, // Red
    { id: "slide4", image: "/animal (1)-min.jpg" }, // Amber
    { id: "slide5", image: "/nature (1)-min.jpg" }, // Purple
  ];

  return (
    < main className="scroll-smooth "> 
      <CountdownTimer/>
      <StickyHeader />
      <AutoSlider slides={slides} interval={5000} />
      <TabsLightboxGallery id="gallary" className="mt-10" />
      <BackToTopButton/>
    </main>
  );
}

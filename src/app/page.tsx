import TabsLightboxGallery from "@/components/tabs";
import CountdownTimer from "@/components/timerOpeningPaage";
import TypeEffect from "@/components/typeEffect";

export default function Home() {
  return (
    <>
     <CountdownTimer/>

     <TypeEffect fixedText="Hello, " dynamicText={["welcome to My Blog "]} className="text-center my-10 font-semibold"/>
     <h1  className="text-center my-10 font-medium ">click any Picture For Better Experience</h1>
     <TabsLightboxGallery/>
    </>
  );
}

import FAQComponent from "../Components/LandingComponents/FAQComponent";
import FeaturesSection from "../Components/LandingComponents/features";
import HeroSection from "../Components/LandingComponents/Hero";
import LandingNav from "../Components/LandingComponents/LandingNav";

function Landing() {
  return (
    <>
     <LandingNav/>
     <HeroSection/>
     <div className="container text-center  py-5">
     <FeaturesSection/>
     <FAQComponent/>
     </div>
    </>
  );
}

export default Landing;

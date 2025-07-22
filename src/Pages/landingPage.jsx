import FAQComponent from "../Components/LandingComponents/FAQComponent";
import FeaturesSection from "../Components/LandingComponents/features";
import HeroSection from "../Components/LandingComponents/Hero";
import LandingNav from "../Components/LandingComponents/LandingNav";
import Footer from "../Components/LandingComponents/Footer";
import DownloadSection from "../Components/LandingComponents/DownLoadSection";
import ScrollToTopButton from "../Components/LandingComponents/ScrollToTopButton";

function Landing() {
  return (
    <>
      <LandingNav />
      <div className="container ">
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <FAQComponent />
      </div>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default Landing;

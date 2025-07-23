import FAQComponent from "../Components/LandingComponents/FAQComponent";
import FeaturesSection from "../Components/LandingComponents/features";
import HeroSection from "../Components/LandingComponents/Hero";
import LandingNav from "../Components/LandingComponents/LandingNav";
import Footer from "../Components/LandingComponents/Footer";
import DownloadSection from "../Components/LandingComponents/DownLoadSection";
import ScrollToTopButton from "../Components/LandingComponents/ScrollToTopButton";
import SupportChat from "../Components/SupportChat/SupportChat";
import { useSelector } from "react-redux";

function Landing() {
  const { UserRole } = useSelector((state) => state.Token);
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
      {UserRole !== 'admin' && <SupportChat />}
      <Footer />
    </>
  );
}

export default Landing;

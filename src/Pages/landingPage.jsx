import FAQComponent from "../Components/LandingComponents/FAQComponent";
import FeaturesSection from "../Components/LandingComponents/features";
import HeroSection from "../Components/LandingComponents/Hero";
import LandingNav from "../Components/LandingComponents/LandingNav";
import Footer from "../Components/LandingComponents/Footer";
import DownloadSection from "../Components/LandingComponents/DownLoadSection";
import ScrollToTopButton from "../Components/LandingComponents/ScrollToTopButton";
import SupportChat from "../Components/SupportChat/SupportChat";
import { useSelector } from "react-redux";
import CompaniesCarousel from "../Components/LandingComponents/companiescarousel";
import TestimonialsSection from "../Components/LandingComponents/TestimonialsSection";

function Landing() {
  const { token, UserRole } = useSelector((state) => state.Token);

  return (
    <>
      <LandingNav token={token} />
      <div className="container ">
        <HeroSection token={token} role={UserRole} />
        <FeaturesSection />
        <DownloadSection />
        <CompaniesCarousel />
        <FAQComponent />
        <TestimonialsSection />
      </div>
      <ScrollToTopButton />
      {UserRole !== "admin" && <SupportChat />}
      <Footer />
    </>
  );
}

export default Landing;

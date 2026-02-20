import Hero from "../components/Hero/Hero";
import Difference from "../components/Difference/Difference";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import Domains from "../components/Domains/Domains";
import Process from "../components/Process/Process";
import TechStack from "../components/TechStack/TechStack";
import Insight from "../components/Insight/Insight";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

function Home() {
  return (
    <>
      <Toaster />
      <Hero />
      <Difference />
      <ProblemSolution />
      <Domains />
      <Process />
      <TechStack />
      <Insight />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;

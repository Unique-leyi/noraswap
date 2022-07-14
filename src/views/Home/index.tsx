import { FC } from "react";

import Header from "./Header";
import SiteDescription from "./SiteDescription";
import JupiterForm from "../JupiterForm/JupiterForm";
import Footer from "./Footer";




const Home: FC = ({ }) => {
  return (
      <div>
        <Header />
        <SiteDescription />
        <JupiterForm />
        <Footer />
      </div>
  );
};

export default Home;
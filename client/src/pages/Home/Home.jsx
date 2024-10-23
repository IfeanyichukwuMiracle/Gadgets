// import React from "react";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { Products } from "../../components/Products";
import { Footer } from "../../components/Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `igadgets - The largets gadget marketplace`;
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </>
  );
};

export default Home;

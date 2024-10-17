import React, { useEffect, useState } from "react";
import "./hero.css";

import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image01.png";
import image3 from "../../assets/image04.png";
import image4 from "../../assets/image03.png";
import image5 from "../../assets/image02.png";
import image6 from "../../assets/image1 (2).jpg";

const Hero = () => {
  const [colors, setColors] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6
  ]);
  const [count, setCount] = useState(0);

  const handleNext = () => {
    if (count < colors.length - 1) {
      setCount(prev => prev + 1);
    } else {
      setCount(0);
    }
  };
  const handlePrev = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    } else {
      setCount(colors.length - 1);
    }
  };

  useEffect(() => {
    const slide = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => {
      clearTimeout(slide);
    };
  }, [count]);
  return (
    <>
      <section className="hero-section">
        <div
          className="product-banner"
          style={{
            background: "var(--white)"
          }}
        >
          <img
            src={colors[count]}
            alt="banner-image"
            style={{
              width: "100%",
              borderRadius: ".1rem",
              // minHeight: "8rem",
              objectFit: "cover"
            }}
          />
        </div>
        <div className="banner-btns">
          <button onClick={handlePrev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="size-6"
              style={{ width: "1.9rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="size-6"
              style={{ width: "1.9rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import Form from "components/Form";
import BarChart from "components/BarChart";

import BackgroundImage from "assets/images/background.png";
import BackgroundImageWebp from "assets/images/background.webp";

import styles from "./App.module.scss";

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const formRef = useRef(null);
  const bgRef = useRef(null);
  const barChartRef = useRef(null);

  const bgClassnames = classNames({
    [`${styles["App__content__bg"]}`]: true,
    [`${styles["App__content__bg--animating"]}`]: isAnimating,
    [`${styles["App__content__bg--noshow"]}`]: !isShow,
  });

  const handleAnimation = (isAnimating) => {
    gsap
      .timeline()
      .to(bgRef.current, { opacity: "0" })
      .to(formRef.current, {
        opacity: "0",
        onComplete: () => setIsAnimating(isAnimating),
      })
      .to(formRef.current, { display: "none" })
      .to(barChartRef.current, {
        opacity: "1",
        display: "flex",
        flexDirection: "column",
      });
  };

  return (
    <div className={styles["App"]}>
      <div className={`bg-main ${styles["App__content"]}`}>
        <div
          ref={bgRef}
          className={`bg-background ${bgClassnames}`}
          onTransitionEnd={() => {
            setIsAnimating(false);
            setIsShow(false);
          }}
        >
          <div className={styles["App__content__bg__image"]}>
            <picture>
              <source srcSet={BackgroundImageWebp} type="image/webp"></source>
              <source srcSet={BackgroundImage} type="image/png"></source>
              <img src={BackgroundImage} alt="background" />
            </picture>
          </div>
          <div className={styles["App__content__bg__text"]}>
            <h2 className="text-bg-heading fw-700">Choose a date range</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              imperdiet bibendum
            </span>
          </div>
        </div>
        <div className={`bg-white ${styles["App__content__primary"]}`}>
          <Form handleAnimation={handleAnimation} ref={formRef} />
          <BarChart ref={barChartRef} />
        </div>
      </div>
    </div>
  );
};

export default App;

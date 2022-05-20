import React from "react";
import Form from "components/Form";

import BackgroundImage from "assets/images/background.png";
import BackgroundImageWebp from "assets/images/background.webp";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles["App"]}>
      <div className={`bg-main ${styles["App__content"]}`}>
        <div className={`bg-background ${styles["App__content__bg"]}`}>
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
          <Form />
        </div>
      </div>
    </div>
  );
};

export default App;

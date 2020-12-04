import React from "react";

import styles from "./EpisodeTitle.module.scss";

const EpisodeTitle = ({ currentEpisode }) => {
  const { url, title } = currentEpisode;

  return (
    <h1 className={styles.title}>
      {/* eslint-disable react/jsx-no-target-blank */}
      <a
        href={url}
        alt={"Ecouter " + title + " sur podCloud"}
        title={"Ecouter " + title + " sur podCloud"}
        target="_blank"
      >
        {title}
      </a>
      {/* eslint-enable react/jsx-no-target-blank */}
    </h1>
  );
};

export default EpisodeTitle;

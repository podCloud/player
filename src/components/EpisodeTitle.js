import React from "react";

import styles from "./EpisodeTitle.module.scss";

const EpisodeTitle = ({ currentEpisode }) => {
  const { url, title } = currentEpisode;

  return (
    <h1 className={styles.title}>
      <a href={url} alt={"Ecouter " + title + " sur podCloud"}>
        {title}
      </a>
    </h1>
  );
};

export default EpisodeTitle;

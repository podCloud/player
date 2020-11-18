import React from "react";

import styles from "./PodcastTitle.module.scss";

const PodcastTitle = ({ currentPodcast }) => {
  const { url, title } = currentPodcast;

  return (
    <h2 className={styles.title}>
      <a href={url} alt={"Découvrir le podcast " + title}>
        {title}
      </a>
    </h2>
  );
};

export default PodcastTitle;

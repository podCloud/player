import React from "react";

import styles from "./PodcastTitle.module.scss";

const PodcastTitle = ({ currentPodcast }) => {
  const { url, title } = currentPodcast;

  return (
    <h2 className={styles.title}>
      {/* eslint-disable react/jsx-no-target-blank */}
      <a
        href={url}
        alt={"Découvrir le podcast " + title}
        title={"Découvrir le podcast " + title}
        target="_blank"
      >
        {title}
      </a>
      {/* eslint-enable react/jsx-no-target-blank */}
    </h2>
  );
};

export default PodcastTitle;

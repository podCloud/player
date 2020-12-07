import React from "react";

import { useTranslation } from "react-i18next";

import styles from "./PodcastTitle.module.scss";

const PodcastTitle = ({ currentPodcast }) => {
  const { url, title } = currentPodcast;
  const { t } = useTranslation();

  const discover_on_podcloud = t("discover_on_podcloud", { title });

  return (
    <h2 className={styles.title}>
      {/* eslint-disable react/jsx-no-target-blank */}
      <a
        href={url}
        alt={discover_on_podcloud}
        title={discover_on_podcloud}
        target="_blank"
      >
        {title}
      </a>
      {/* eslint-enable react/jsx-no-target-blank */}
    </h2>
  );
};

export default PodcastTitle;

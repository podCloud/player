import React from "react";

import styles from "./EpisodeTitle.module.scss";

import { useTranslation } from "react-i18next";

const EpisodeTitle = ({ currentEpisode }) => {
  const { podcloud_url, title } = currentEpisode;
  const { t } = useTranslation();

  const listen_on_podcloud = t("listen_on_podcloud", { title });

  return (
    <h1 className={styles.title}>
      {/* eslint-disable react/jsx-no-target-blank */}
      <a
        href={podcloud_url}
        alt={listen_on_podcloud}
        title={listen_on_podcloud}
        target="_blank"
      >
        {title}
      </a>
      {/* eslint-enable react/jsx-no-target-blank */}
    </h1>
  );
};

export default EpisodeTitle;

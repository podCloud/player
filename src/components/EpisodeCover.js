import React from "react";

import styles from "./EpisodeCover.module.scss";

import { useTranslation } from "react-i18next";

const EpisodeCover = ({ currentEpisode, large }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cover}>
      <img
        src={currentEpisode.cover.medium_url}
        alt={t("episode_cover_title", { title: currentEpisode.title })}
        title={t("episode_cover_title", { title: currentEpisode.title })}
      />
    </div>
  );
};

export default EpisodeCover;

import React from "react";

import EpisodesListItem from "./EpisodesListItem";

import classnames from "classnames";

import styles from "./EpisodesList.module.scss";

const EpisodesList = ({ episodesList, setCurrentEpisode, open }) => {
  return Array.isArray(episodesList) && episodesList.length > 0 ? (
    <div className={classnames(styles.list, { [styles.open]: open })}>
      {episodesList.map((ep) => (
        <EpisodesListItem
          key={ep._id}
          episode={ep}
          setCurrentEpisode={setCurrentEpisode}
        />
      ))}
    </div>
  ) : null;
};
export default EpisodesList;

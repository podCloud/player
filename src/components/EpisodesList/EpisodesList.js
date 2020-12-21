import React from "react";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Header from "./Header";
import EpisodesListItem from "./EpisodesListItem";

import classnames from "classnames";

import styles from "./EpisodesList.module.scss";

const EpisodesList = ({
  className,
  episodesList,
  setCurrentEpisode,
  closeFn,
  open,
}) => {
  return Array.isArray(episodesList) && episodesList.length > 0 ? (
    <div
      className={classnames(className, styles.list, { [styles.open]: open })}
    >
      <style>:root {`{ --list-opened: ${open ? true : false}; }`}</style>
      <Header className={styles.header} closeFn={closeFn} />
      <SimpleBar style={{ maxHeight: "100%" }} autoHide={false}>
        {episodesList.map((ep) => (
          <EpisodesListItem
            key={ep._id}
            episode={ep}
            setCurrentEpisode={setCurrentEpisode}
          />
        ))}
      </SimpleBar>
    </div>
  ) : null;
};
export default EpisodesList;

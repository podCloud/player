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
  keepOpened,
}) => {
  return (
    <div
      className={classnames(className, styles.list, { [styles.open]: open })}
    >
      <style>
        :root {`{ --list-opened: ${open || keepOpened ? true : false}; }`}
      </style>
      <Header className={styles.header} closeFn={closeFn} />
      {episodesList?.loading ? (
        <div className={styles.loader}></div>
      ) : Array.isArray(episodesList) && episodesList.length > 0 ? (
        <SimpleBar style={{ maxHeight: "100%" }} autoHide={false}>
          {episodesList.map((ep) => (
            <EpisodesListItem
              key={ep._id}
              episode={ep}
              setCurrentEpisode={setCurrentEpisode}
            />
          ))}
        </SimpleBar>
      ) : null}
    </div>
  );
};
export default EpisodesList;

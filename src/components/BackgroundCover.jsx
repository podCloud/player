import React from "react";

import { isInFrame } from "../utils";

import classnames from "classnames";
import styles from "./BackgroundCover.module.scss";

const BackgroundCover = ({ currentEpisode, fullpage, className }) => (
  <div
    className={classnames(
      styles.background_cover,
      { [styles.fullpage]: fullpage, [styles.force]: !isInFrame() },
      className
    )}
    style={{
      backgroundImage: `url(${currentEpisode.cover.small_url})`,
    }}
  ></div>
);

export default BackgroundCover;

import React from "react";

import classnames from "classnames";

import styles from "./PlaybackRate.module.scss";

const PlaybackRateIcon = ({ className, rate = 1 }) => (
  <div
    className={classnames(className, styles.playback_rate, {
      [styles.small]: Math.round(rate) !== rate,
    })}
  >
    {rate}x
  </div>
);

export default React.memo(PlaybackRateIcon);

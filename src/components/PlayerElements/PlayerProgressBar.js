import React, { useRef } from "react";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

import styles from "./PlayerProgressBar.module.scss";

const PlayerProgressBar = () => {
  const [playerState] = useRecoilState(playerStore);

  const progressbarRef = useRef();

  const { percent, seekToPercent } = playerState;

  function updateTime(event) {
    const pgbar = progressbarRef.current;
    if (pgbar && event.target === pgbar) {
      const percent = event.nativeEvent.offsetX / event.target.offsetWidth;
      seekToPercent(percent);
      pgbar.style.width = `${percent} %`;
    }
  }

  return (
    <div
      className={styles.progress_bar}
      ref={progressbarRef}
      onClick={updateTime}
    >
      <div className={styles.bar} style={{ width: percent + "%" }}></div>
    </div>
  );
};

export default PlayerProgressBar;

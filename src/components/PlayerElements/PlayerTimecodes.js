import React from "react";

import { convertHMS } from "../../utils";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

import styles from "./PlayerTimecodes.module.scss";

const PlayerTimecodes = ({ initialDuration = 0 }) => {
  const [playerState] = useRecoilState(playerStore);

  const { currentTime, duration } = playerState;

  return (
    <div className={styles.timecodes}>
      <div>{convertHMS(currentTime || 0)}</div>
      <div style={{ flexGrow: 1 }}></div>
      <div>{convertHMS(duration || initialDuration)}</div>
    </div>
  );
};
export default PlayerTimecodes;

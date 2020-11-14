import React from "react";

import { convertHMS } from "../../utils";

const PlayerAudioTimer = ({ playerRef, initialDuration = 0 }) => (
  <div className="time">
    <p id="audio-time">{convertHMS(playerRef.current?.currentTime || 0)}</p>
    <p id="audio-duration">
      {convertHMS(playerRef.current?.duration || initialDuration)}
    </p>
  </div>
);

export default PlayerAudioTimer;

import React from "react";

import "./PodcloudPlayer.css";

import PodcloudProvider from "./PodcloudProvider";
import Player from "../components/Player";

const PodcloudPlayer = () => {
  // get guid or feed_id from url

  return (
    <PodcloudProvider guid={"5fa3a8c5fc92823536cc66ce"}>
      <Player />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

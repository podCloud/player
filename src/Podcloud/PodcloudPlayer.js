import React from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

const PodcloudPlayer = () => {
  // get guid or feed_id from url

  const guid = (document.location.pathname.match(/guid\/([\w\d]+)/) || [])[1];
  const list = document.location.pathname.includes("list/true");

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

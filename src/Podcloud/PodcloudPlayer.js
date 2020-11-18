import React from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

const PodcloudPlayer = () => {
  // get guid or feed_id from url

  const guid = (document.location.search.match(/guid=([\w\d]+)/) || [])[1];

  return (
    <PodcloudProvider>
      <PodcloudLoader
        guid={guid || "5fa3a8c5fc92823536cc66ce"}
        PlayerComponent={Player}
      />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

import React from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

const PodcloudPlayer = () => {
  // get guid or feed_id from url

  let guid = (document.location.pathname.match(/guid\/([\w\d]+)/) || [])[1];
  const list = document.location.pathname.includes("list/true");

  if (!guid) {
    const meta = document.querySelector("meta[property='podcloud:item_id']");
    if (meta) {
      guid = meta.content;
    }
  }

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

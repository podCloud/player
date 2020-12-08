import React, { useEffect } from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

import { debounce } from "debounce";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

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

  useEffect(() => {
    const resizeListener = debounce(() => {
      const message = { setMyHeight: getWidth() > 450 ? 180 : 425 };

      console.log(message);
      window.parent.postMessage(message, "*");
    }, 120);

    window.addEventListener("resize", resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

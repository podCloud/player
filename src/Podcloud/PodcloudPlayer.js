import React, { useEffect } from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

import { debounce } from "debounce";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const parseOptVal = (val) => {
  // undefined means something like "list", so we infer list:true
  if (typeof val === "undefined") return true;

  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "false") {
      return false;
    }
    if (trimmed === "true") {
      return true;
    }
    return trimmed;
  }

  return val;
};

const parseOpts = (str) =>
  str
    .split("/")
    .filter((a) => typeof a === "string" && a.trim().length)
    .map((a) => a.split(";"))
    .flat()
    .filter((a) => typeof a === "string" && a.trim().length)
    .reduce((opts, opt) => {
      const [key, val] = opt.split(":");
      console.log({ key, val });

      opts[key] = parseOptVal(val);

      return opts;
    }, {});

const DEFAULT_OPTS = { list: false, fixedSize: false };

const PodcloudPlayer = () => {
  const opts = Object.assign(
    DEFAULT_OPTS,
    ...[
      document.querySelector("meta[property='podcloud:player']")?.content || "",
      document.location.pathname.substring(
        document.location.pathname.lastIndexOf("player")
      ),
    ].map(parseOpts)
  );

  console.log({ player_options: opts });

  const list = opts.list;
  const fixedSize = opts.fixedSize;
  const guid = opts.guid;

  useEffect(() => {
    if (fixedSize) {
      console.log("fixed size");
      return;
    }

    const resizeListener = debounce(() => {
      const message = { setMyHeight: getWidth() > 575 ? 200 : 420 };

      console.log(message);
      window.parent.postMessage(message, "*");
    }, 120);

    window.addEventListener("resize", resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [fixedSize]);

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;

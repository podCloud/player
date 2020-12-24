import { debounce } from "debounce";

export const convertHMS = (pSec) => {
  let nbSec = pSec;
  let sortie = {};
  sortie.heure = Math.trunc(nbSec / 3600);
  if (sortie.heure < 10) {
    sortie.heure = "0" + sortie.heure;
  }
  if (sortie.heure < 1) {
    sortie.heure = null;
  }

  nbSec = nbSec % 3600;
  sortie.minute = Math.trunc(nbSec / 60);
  if (sortie.minute < 10) {
    sortie.minute = "0" + sortie.minute;
  }

  nbSec = nbSec % 60;
  sortie.seconde = Math.trunc(nbSec);
  if (sortie.seconde < 10) {
    sortie.seconde = "0" + sortie.seconde;
  }

  return (
    (sortie.heure ? `${sortie.heure}:` : "") +
    sortie.minute +
    ":" +
    sortie.seconde
  );
};

export const getBestViewportHeight = () =>
  parseInt(
    `${getComputedStyle(document.documentElement).getPropertyValue(
      "--best-viewport-height"
    )}`.trim(),
    10
  );

export const getListHeight = () =>
  parseInt(
    `${getComputedStyle(document.documentElement).getPropertyValue(
      "--list-height"
    )}`.trim(),
    10
  );

export const isPlayerPortrait = () =>
  `${getComputedStyle(document.documentElement).getPropertyValue(
    "--player-mode"
  )}`.trim() === "portrait";

export const isPlayerNarrow = () =>
  `${getComputedStyle(document.documentElement).getPropertyValue(
    "--player-narrow"
  )}`.trim() === "true";

export const isPlayerHorizontal = () =>
  !isPlayerNarrow() && !isPlayerPortrait();

export const isListOpened = () =>
  `${getComputedStyle(document.documentElement).getPropertyValue(
    "--list-opened"
  )}`.trim() === "true";

export const getActualPlayerHeight = () => {
  const player = document.querySelector("[player-wrapper]")?.[0];
  return player
    ? window.getComputedStyle(player).getPropertyValue("height")
    : 0;
};

export const resizeFrame = debounce((forceListOpened) => {
  const withList = isListOpened() || forceListOpened === true;
  const listHeight = isPlayerHorizontal() && withList ? getListHeight() : 0;

  const message = {
    src: window.location.toString(),
    context: "iframe.resize",
    height: Math.max(
      getActualPlayerHeight(),
      getBestViewportHeight() + listHeight
    ),
  };

  console.log("sending message", message);
  window.parent.postMessage(JSON.stringify(message), "*");
}, 10);

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

export const parseOpts = (str) =>
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

export const isInFrame = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

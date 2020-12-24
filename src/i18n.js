import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      loading: "Loading...",
      error_occured: "An error occured. Please try again later.",
      unknown_episode:
        "This episode does not exists.\u00A0<0>Discover more podcasts on podCloud</0>",
      unavailable_episode:
        "This episode cannot be viewed in this player.\u00A0<0>View it on podCloud !</0>",
      minus15: "-15s",
      plus15: "+15s",
      play: "Play",
      resume: "Resume",
      pause: "Pause",
      fullscreen: "Fullscreen",
      change_speed: "Change playback speed",
      episodes_list: "Toggle episodes list",
      episodes_list_title: "Episodes list",
      episode_cover_title: "{{title}} episode cover",
      listen_on_podcloud: "Listen {{title}} on podCloud",
      discover_on_podcloud: "Discover {{title}} on podCloud",
    },
  },
  fr: {
    translation: {
      loading: "Chargement...",
      error_occured: "Une erreur est survenue. Merci de réessayer plus tard.",
      unknown_episode:
        "Cet épisode n'existe pas.\u00A0<0>Découvrez plus de podcasts sur podCloud.</0>",
      unavailable_episode:
        "Cet épisode n'est pas disponible dans ce lecteur.\u00A0<0>Retrouvez le sur podCloud !</0>",
      play: "Lecture",
      resume: "Reprendre",
      pause: "Pause",
      fullscreen: "Plein écran",
      change_speed: "Changer la vitesse de lecture",
      episodes_list: "Afficher ou masquer la liste d'épisodes",
      episodes_list_title: "Liste des épisodes",
      episode_cover_title: "Pochette de {{title}}",
      listen_on_podcloud: "Écouter {{title}} sur podCloud",
      discover_on_podcloud: "Découvrir {{title}} sur podCloud",
    },
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

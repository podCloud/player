import React from "react";

import classnames from "classnames";

import { useTranslation } from "react-i18next";

import styles from "./Header.module.scss";

const Header = ({ className, closeFn }) => {
  const { t } = useTranslation();

  return (
    <div className={classnames(className, styles.header)}>
      <span className={styles.title}>{t("episodes_list_title")}</span>
      <div className={styles.close_button} onClick={closeFn}>
        ✖
      </div>
    </div>
  );
};

export default Header;

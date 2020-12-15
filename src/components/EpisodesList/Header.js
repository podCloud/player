import React from "react";

import classnames from "classnames";

import styles from "./Header.module.scss";

const Header = ({ className, closeFn }) => {
  return (
    <div className={classnames(className, styles.header)}>
      Liste des épisodes
      <div className={styles.close_button} onClick={closeFn}>
        ✖
      </div>
    </div>
  );
};

export default Header;

import React from "react";

import styles from "./PlayerControl.module.scss";

import classnames from "classnames";

const PlayerControl = ({
  primary,
  secondary,
  className,
  title,
  rate,
  Icon,
  iconSrc,
  onClick,
}) => (
  <div
    className={classnames(
      { [styles.primary]: primary, [styles.secondary]: secondary },
      className,
      styles.control
    )}
    onClick={onClick}
    title={title}
  >
    {Icon ? <Icon rate={rate} /> : null}
    {iconSrc ? <img src={iconSrc} alt={title} /> : null}
  </div>
);

export default PlayerControl;

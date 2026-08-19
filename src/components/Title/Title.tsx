import React from "react";
import styles from "./Title.module.css";
import { Divider } from "../Divider";

export type TitleProps = {
  title: string;
  color?: string;
  background?: string;
  height?: string;
};

const Title: React.FC<TitleProps> = ({ title, color, background, height }) => {
  const colorFont = color && color !== "" ? color : "#FFFF";
  const backgroundColor = background && background !== "" ? background : "#FFFF";
  const titleHeight = height && height !== "" ? height : "72px";

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        style={{ background: backgroundColor, color: colorFont, height: titleHeight }}
      >
        {title}
      </h1>
      <Divider />
    </div>
  );
};

export default Title;

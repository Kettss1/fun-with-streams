import { FC } from "react";
import { TagModel } from "./tags.model";
import styles from './tags.module.scss';
import Chip from "../chip/chip";

const Tags: FC<TagModel> = ({ label, count }) => {
  return (
    <div className={styles.tagsContainer}>
      <Chip label={label} badge={count} />
    </div>
  )
}

export default Tags;
import { FC } from "react";
import styles from './chip.module.scss';
import { ChipModel } from "./chip.model";

const Chip: FC<ChipModel> = ({ label, badge }) => {
  return (
    <div className={styles.chipContainer}>
      <p>{label}</p>
      {badge && (
        <p className={styles.badgeContainer}>{badge}</p>
      )}
    </div>
  )
}

export default Chip;
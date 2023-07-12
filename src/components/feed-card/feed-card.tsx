import { FC, useEffect, useState } from "react";
import { FeedCardModel } from "./feed-card.model";
import styles from './feed-card.module.scss';
import Image from "next/image";
import Chip from "../chip/chip";

const FeedCard: FC<FeedCardModel> = ({ message, tags, timestamp, user }) => {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(timestamp);
    const formatedDate = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    setDate(formatedDate);
  }, [timestamp])

  return (
    <div className={styles.feedCardContainer}>
      <div className={styles.feedCardHeader}>
        <div>
          <Image priority={true} src={user.image_url} alt={user.username} width={35} height={35} />
          <div>
            <p>{user.name}</p>
            <p className={styles.username}>{user.username}</p>
          </div>
        </div>
        <p>{date}</p>
      </div>
      <div className={styles.feedCardMessage}>
        <p>{message}</p>
      </div>
      <div className={styles.feedCardBadges}>
        {tags.slice(0, 3).map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}
      </div>
    </div>
  )
} 

export default FeedCard;
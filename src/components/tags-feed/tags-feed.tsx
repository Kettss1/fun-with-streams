import { FC, useEffect, useState } from "react";
import styles from './tags-feed.module.scss';
import { TagsFeedModel } from "./tags-feed.model";
import Tags from "../tags/tags";
import { TagModel } from "../tags/tags.model";

const TagsFeed: FC<TagsFeedModel> = ({ tags }) => {
  const [tagsFeed, setTagsFeed] = useState<TagModel[]>([]);

  useEffect(() => {
    const sortedTags = tags.sort((a, b) => b.count - a.count);
    setTagsFeed(sortedTags.slice(0, 10));
  }, [tags]);

  return (
    <div className={styles.tagsFeedContainer}>
      <p>Top Tags</p>
      {tagsFeed.map((tag, index) => (
        <Tags key={index} count={tag.count} label={tag.label} />
      ))}
    </div>
  )
}

export default TagsFeed;
import { FC } from 'react';
import { SidebarModel } from './sidebar.model';
import styles from './sidebar.module.scss';
import Chip from '../chip/chip';
import TagsFeed from '../tags-feed/tags-feed';

const Sidebar: FC<SidebarModel> = ({ eventRatePerMin, totalEvents, tags }) => {
  return (
    <div className={styles.sidebarContainer}>
      <p>Fun With Streams</p>
      <div className={styles.chipsContainer}>
        <div>
          <label>Event Rate per Minute</label>
          <Chip label={eventRatePerMin}></Chip>
        </div>
        <div>
          <label>Total Events</label>
          <Chip label={totalEvents}></Chip>
        </div>
      </div>
      <div>
        <TagsFeed tags={tags} />
      </div>
    </div>
  )
}

export default Sidebar;
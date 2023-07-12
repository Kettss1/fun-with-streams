import Head from 'next/head'
import {  useEffect, useMemo, useRef, useState } from 'react'
import Sidebar from '@/components/sidebar/sidebar';
import styles from '@/styles/index.module.scss';
import { useVirtual } from '@tanstack/react-virtual';
import FeedCard from '@/components/feed-card/feed-card';

export default function Home() {
  const parentRef = useRef(null);
  const [tags, setTags] = useState<any>([]);
  const [wsData, setWSData] = useState<any[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [eventRatePerMin, setEventRatePerMin] = useState<number>(0);
  const [lastDate, setLastDate] = useState<Date>(new Date());
  const tagsMap = useMemo(() => new Map(), []); 
  
  const virtualizer = useVirtual({
    size: totalEvents,
    parentRef
  })

  useEffect(() => {
    const newWSConection = new WebSocket('ws://beeps.gg/stream');
    newWSConection.onerror = err => console.error(err);
    newWSConection.onmessage = msg => {
      const data = JSON.parse(msg.data);
      data.tags.forEach((tag: string) => {
        if (tagsMap.has(tag)) {
          tagsMap.set(tag, tagsMap.get(tag) + 1);
        } else {
          tagsMap.set(tag, 1);
        }
      });
      const tagsArray = Array.from(tagsMap, ([label, count]) => ({ label, count }));
      setTags(tagsArray);
      setWSData((prev) => [data, ...prev]);
      
      const now = new Date();
      // get the amout of seconds between now and the last date
      const seconds = (now.getTime() - lastDate.getTime()) / 1000;
      // update the event rate per minute
      const eventRatePerMin = (60 / seconds);
      setEventRatePerMin(eventRatePerMin);
      setLastDate(now);
    };
    
    return () => {
      newWSConection.close();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDate])

  useEffect(() => {
    setTotalEvents(wsData.length);
  }, [wsData])

  return (
    <>
      <Head>
        <title>Fun with Streams</title>
        <meta name="description" content="Fun with Streams app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer} ref={parentRef}>
        <Sidebar
          eventRatePerMin={eventRatePerMin.toFixed(2)}
          totalEvents={totalEvents}
          tags={tags}
        />
        <div className={styles.feedContainer}>
          {virtualizer.virtualItems.map(virtualItem => (
            <FeedCard key={virtualItem.index} user={wsData[virtualItem.index].user} message={wsData[virtualItem.index].message} tags={wsData[virtualItem.index].tags} timestamp={wsData[virtualItem.index].timestamp} />
          ))}
        </div>
      </main>
    </>
  )
}

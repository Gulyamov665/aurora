import React from 'react'
import Stories from 'react-insta-stories'
import styles from './Story.module.scss'

export default function Story({ setShowStory }) {
  const stories = [
    'https://avatars.mds.yandex.net/i?id=09d37fc3c6b7afcff5fe4837c7b3109315a93d92-12484816-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=43f1a029d98aef8cb0091dba04947086_l-5292126-images-thumbs&n=27&h=480&w=480',
  ]

  return (
    <div>
      <div className={styles.stories_main}>
        <Stories
          stories={stories}
          defaultInterval={3000}
          width={432}
          height={768}
          isPaused={true}
          onAllStoriesEnd={() => setShowStory(false)}
        />
      </div>
    </div>
  )
}

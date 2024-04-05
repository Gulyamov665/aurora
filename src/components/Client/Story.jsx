import React, { useEffect } from 'react'
import Stories from 'react-insta-stories'
import styles from './Story.module.scss'

export default function Story({ setShowStory, showStory }) {
  useEffect(() => {
    if (showStory) {
      document.body.classList.toggle('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [showStory])

  const stories = [
    'https://wallbox.ru/resize/640x960/wallpapers/main/201316/6ac55852b6fddde.jpg',
    'https://w.forfun.com/fetch/2d/2d89483a3b3f38a008b870eee3d3ac1d.jpeg?h=900&r=0.5',
    'https://wallbox.ru/resize/640x960/wallpapers/main/201316/6ac55852b6fddde.jpg',
    'https://img.alicdn.com/imgextra/i1/40280947/O1CN01p2BsLR1IrlbXLPNiv_!!40280947.jpg',
    'https://kartinki.pics/uploads/posts/2021-08/1629689190_8-kartinkin-com-p-samaya-krasivaya-yeda-yeda-krasivo-foto-8.jpg',
    'https://kartinki.pics/uploads/posts/2021-07/1625795930_8-kartinkin-com-p-samaya-vkusnaya-yeda-yeda-krasivo-foto-8.jpg',
  ]

  return (
    <div className={styles.container}>
      <div className={styles.stories_main}>
        <Stories
          className={styles.stories}
          stories={stories}
          defaultInterval={5000}
          width="100%"
          height="100%"
          //   storyStyles={{
          //     objectFit: 'cover',
          //     textAlign: 'center',
          //     margin: '0 auto',
          //   }}
          //   progressContainerStyles={{ marginTop: '10px' }}
          onAllStoriesEnd={() => setShowStory(false)}
        />
      </div>
    </div>
  )
}

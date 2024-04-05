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
    'https://avatars.mds.yandex.net/get-altay/214458/2a00000162aab900bd6f56e10c1be07409b0/XXL',
    'https://avatars.mds.yandex.net/i?id=43f1a029d98aef8cb0091dba04947086_l-5292126-images-thumbs&n=27&h=480&w=480',
    'https://animals-land.ru/wp-content/uploads/2022/02/1627489827_21-funart-pro-p-boitsovskie-porodi-sobak-pitbul-zhivotnie-23.jpg',
    'https://w.forfun.com/fetch/5d/5d572d697e41c82ac511549420ebcf44.jpeg',
  ]

  return (
    <div className={styles.container}>
      <div className={styles.stories_main}>
        <Stories
          stories={stories}
          defaultInterval={5000}
          width="100%"
          height="100vh"
          storyStyles={{ margin: '0 auto' }}
          progressContainerStyles={{ marginTop: '50px' }}
          onAllStoriesEnd={() => setShowStory(false)}
        />
      </div>
    </div>
  )
}

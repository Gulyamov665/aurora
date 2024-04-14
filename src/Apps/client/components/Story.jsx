import React, { useEffect } from 'react'
import Stories from 'react-insta-stories'
import styles from '../static/Story.module.scss'

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
    'https://s10.stc.all.kpcdn.net/russia/wp-content/uploads/2021/10/dostavka-gotovoj-edy-na-zakaz-v-moskve-Barskaya-trapeza.jpg',
  ]

  return (
    <>
      <div className={styles.castum_container}>
        <div className={styles.stories_main}>
          <Stories
            className={styles.stories}
            stories={stories}
            defaultInterval={10000}
            width="100%"
            height="100vh"
            // width={432}
            // height="100%"
            storyContainerStyles={{
              // textAlign: 'center',
              margin: '0 auto',
              // height: '90%',
            }}
            storyStyles={{
              objectFit: 'contain',
              textAlign: 'center',
            }}
            //   progressContainerStyles={{ marginTop: '10px' }}
            onAllStoriesEnd={() => setShowStory(false)}
          />
        </div>
      </div>
    </>
  )
}

import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={170}
    viewBox="0 0 400 350"
    backgroundColor="#c2bdbd"
    foregroundColor="#ecebeb"
  >
    <rect x="9" y="8" rx="0" ry="0" width="371" height="288"/>
    {/* <rect x="9" y="121" rx="0" ry="0" width="372" height="49" /> */}
  </ContentLoader>
)

export default Skeleton

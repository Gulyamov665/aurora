import React from 'react'
import style from '../static/Loading.module.scss'

export default function Loading({ main = false }) {
  return (
    <div
      className={
        main ? style['backgroundLoader'] : style['backgroundLoaderTransparent']
      }
    >
      <div className={style.loader}>
        <span className={`${style.spinner} ${style.spinner1}`} />
        <span className={`${style.spinner} ${style.spinner2}`} />
        <span className={`${style.spinner} ${style.spinner3}`} />
        <br />
        <span className={style.loaderText}>LOADING...</span>
      </div>
    </div>
  )
}

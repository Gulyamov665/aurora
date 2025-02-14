import { JSX } from 'react'

export interface IconItem {
  icon: JSX.Element
  title: string
  link: string
  counter?: number
}

export interface NavbarBottomProps {
  icons: IconItem[]
}

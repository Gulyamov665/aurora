export type CategoryProps = {
  search: string
}

export type ProductType = {
  id: number
  name: string
  photo: string
  price: number
  description: string
  is_active: boolean
  restaurant: number
  availability: boolean
}

export type CategoryType = {
  id: number
  restaurant: number
  name: string
  order: number
  is_active: boolean
}

export type PromoType = {
  id: number
  restaurant: number
  name: string
  description: string
  price: number
  is_active: boolean
  photo: string
}

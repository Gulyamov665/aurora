export type ProductType = {
  id: number
  name: string
  photo: string
  price: number
  count: number

}

export type OrderProductsProps = {
  product: ProductType
  increase: () => void
  decrease: () => void
}

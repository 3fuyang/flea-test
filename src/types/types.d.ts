export interface RawGood {
  good_id: string
  seller_id: string
  price: number
  title: string
  category: '图书音像' | '电子产品' | '美妆个护' | '运动户外' | '生活电器' | '其他'
  campus: '嘉定校区' | '四平路校区' | '沪西校区' | '沪北校区' 
  intro: string
  avaiable: boolean
  image: string
}
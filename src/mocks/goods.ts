interface GoodInfo {
  id: string
  image: string
  title: string
  price: number
  category: '图书音像' | '电子产品' | '美妆个护' | '运动户外' | '生活电器' | '其他'
  campus: '嘉定校区' | '四平路校区' | '沪西校区' | '沪北校区'
  info: string
  available: boolean
}

const mockGetGoods: GoodInfo[] = [
  {
    id: '0',
    title: '维达(Vinda) 抽纸 超韧3层130抽*24包软抽 纸巾(真S码) 整箱销售 湿水不易破 母婴可用 抽取式面巾纸',
    price: 48.90,
    image: 'default',
    category: '美妆个护',
    campus: '四平路校区',
    info: '？',
    available: true
  },
  {
    id: '1',
    title: '当代激进思想家译丛：延迟的否定：康德、黑格尔与意识形态批判',
    price: 56.40,
    image: 'default',
    category: '图书音像',
    campus: '嘉定校区',
    info: '？',
    available: true    
  },
  {
    id: '2',
    title: '海氏海诺 酒精棉片 医用酒精消毒棉片 200片独立包装皮肤消毒湿巾',
    price: 25.75,
    image: 'default',
    category: '美妆个护',
    campus: '沪北校区',
    info: '？',
    available: true    
  },
  {
    id: '3',
    title: '可立仕（cleace）75%酒精喷雾280ml*2+100ml*2 消毒喷雾乙醇免洗消毒液 居家办公杀菌',
    price: 37.00,
    image: 'default',
    category: '美妆个护',
    campus: '四平路校区',
    info: '？',
    available: true    
  },
  {
    id: '4',
    title: 'Vue.js设计与实现 霍春阳 框架&源码解读',
    price: 88,
    image: 'default',
    category: '图书音像',
    campus: '四平路校区',
    info: '？',
    available: true    
  },
  {
    id: '5',
    title: 'Apple iPad Pro 11英寸平板电脑',
    price: 3499,
    image: 'default',
    category: '生活电器',
    campus: '四平路校区',
    info: '？',
    available: true    
  }
]

export { mockGetGoods }
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare type GlobalEnum = {
  SEARCHHISTORY: string
}
declare interface Goods {
  goodsId: number,
  goodsTitle: string,
  goodsSmallImages: string[],
  goodsImageUrl: string,
  zkFinalPrice: string,

  jddNum?: number,
  jddPrice?: string,
  origPrice?: string,
  goodsDescription?: string,
  reservePrice?: string,
  clickUrl?: string,
  goodsUrlWord?: string,
  // 商品销量
  volume: number,

  // ----优惠券----
  // 优惠券价格
  couponAmount: number,
  // 优惠券信息-优惠券面额。如：满299元减20元
  couponAmountString: string,
  couponInfo?: string,
  // 二合一券
  couponShareUrl?:string,

  goodsDescContent?:string,
  categoryId?:number,
  categoryName?:string,
  levelOneCategoryId?:number,
  levelOneCategoryName?:string,
  // 从商品列表进入时带入的sclick/uland
  url?: string


  // ----- 聚划算拼团 -----
  sellNum: number,
  // ----- 爬虫抓取
  taobaoGoodsDetailView: any
}
declare interface goodsListReq {
  cat?: string,
  q?: string,
  materialId?: number,
  adzoneId?: number,
  pageNo?:  number,
  pageSize?: number,
  platform?: number,
  // 排序_des（降序），排序_asc（升序），销量（total_sales），淘客佣金比率（tk_rate）， 累计推广量（tk_total_sales），总支出佣金（tk_total_commi），价格（price）
  sort?: string,
  // 优惠券筛选-是否有优惠券。true表示该商品有优惠券，false或不设置表示不限
  hasCoupon?:boolean
}
declare interface UserInfo {
  tkUserId: number,
  nickName: string,
  user: {
    tkUserId: number
  }
}
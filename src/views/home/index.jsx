import React, { memo, useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { fetchHomeDataAction } from "@/store/modules/home"
import HomeBanner from "./c-cpns/home-banner"
import HomeSectionV1 from "./c-cpns/home-section-v1"
import HomeSectionV2 from "./c-cpns/home-section-v2"
import { HomeWrapper } from "./style"
import { isEmptyO } from "src/utils"
import HomeLongfor from "./c-cpns/home-longfor"
import HomeSectionV3 from "./c-cpns/home-section-v3"
import AppHeader from "src/components/app-header"
import { changeHeaderConfigAction } from "src/store/modules/main"

export default memo(function Home() {
  /** 从redux中获取数据 */
  // shallowEqual浅拷贝，只有前后数据不一致的时候才会重新渲染
  // const state = useSelector(
  const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo, plusInfo } =
    useSelector(
      (state) => ({
        goodPriceInfo: state.home.goodPriceInfo,
        highScoreInfo: state.home.highScoreInfo,
        discountInfo: state.home.discountInfo,
        recommendInfo: state.home.recommendInfo,
        longforInfo: state.home.longforInfo,
        plusInfo: state.home.plusInfo,
      }),
      shallowEqual
    )

  // 针对discountInfo的tabs嵌套多层做一个数据转换，再传递给另一个组件
  // const tabNames = discountInfo.dest_address?.map((item) => item.name)

  // /** 数据的转换 */
  // const [name, setName] = useState("佛山")
  // // name作为形参名所以随便取，见名知意最好
  // const tabClickHandle = useCallback(function (index, name) {
  //   setName(name)
  // }, [])

  // 发起进行无网络请求(到store中封装)
  /** 派发异步的事件：发送网络请求(只是发送网络请求存储到store中，数据没有给到页面中) */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomeDataAction("xxx"))
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: true }))
  }, [dispatch])

  return (
    <HomeWrapper>
      <AppHeader />
      <HomeBanner />
      <div className="content">
        {/* 折扣数据 */}
        {/* <div className="discount">
          <SectionHeader title={discountInfo.title} subtitle={discountInfo.subtitle} />
          <SectionTabs tabNames={tabNames} tabClick={tabClickHandle} />
          <SectionRooms roomList={discountInfo.dest_list?.[name]} itemWidth="33.3333%" />
        </div> */}
        {/* isEmptyO工具函数保证传过来的数据有值再渲染组件 */}
        {isEmptyO(discountInfo) && <HomeSectionV2 infoData={discountInfo} />}
        {isEmptyO(recommendInfo) && <HomeSectionV2 infoData={recommendInfo} />}

        {isEmptyO(longforInfo) && <HomeLongfor infoData={longforInfo} />}

        {isEmptyO(goodPriceInfo) && <HomeSectionV1 infoData={goodPriceInfo} />}
        {isEmptyO(highScoreInfo) && <HomeSectionV1 infoData={highScoreInfo} />}

        {isEmptyO(plusInfo) && <HomeSectionV3 infoData={plusInfo} />}
      </div>
    </HomeWrapper>
  )
})

import React, { memo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { ItemWrapper } from "./style"

import { Carousel } from "antd"
import { Rating } from "@mui/material"
import IconArrowLeft from "src/assets/svg/icon-arrow-left"
import IconArrowRight from "src/assets/svg/icon-arrow-right"
import Indicator from "src/base-ui/indicator"
import classNames from "classnames"

const RoomItem = memo(function RoomItem(props) {
  // 将itemClick操作传出去
  const { itemData, itemWidth = "25%", itemClick } = props
  // 对selectIndex做一个记录，并对变量进行定义
  const [selectIndex, setSelectIndex] = useState(0)
  const sliderRef = useRef()

  /** 左右箭头按钮的事件处理的函数 */
  function controlClickHandle(isNext = true, event) {
    // 上一个面板/下一个面板
    isNext ? sliderRef.current.next() : sliderRef.current.prev()

    // 获取/记录最新的索引
    // 限制边界条件
    let newIndex = isNext ? selectIndex + 1 : selectIndex - 1
    const length = itemData.picture_urls.length
    if (newIndex < 0) newIndex = length - 1
    if (newIndex > length - 1) newIndex = 0
    setSelectIndex(newIndex)

    // 阻止事件冒泡（避免点击轮播图标时直接跳到详情页而不是下一张图片）
    // stopPropagation可以在MDN上搜索
    event.stopPropagation()
  }

  // 子元素的赋值
  // 将cover的元素逻辑抽到这里
  const pictureElement = (
    <div className="cover">
      <img src={itemData.picture_url} alt="" />
    </div>
  )
  // 将slider的元素逻辑抽到这里
  const sliderElement = (
    <div className="slider">
      <div className="control">
        <div className="btn left" onClick={(e) => controlClickHandle(false, e)}>
          <IconArrowLeft width="30" height="30" />
        </div>
        <div className="btn right" onClick={(e) => controlClickHandle(true, e)}>
          <IconArrowRight width="30" height="30" />
        </div>
      </div>

      <div className="indicator">
        <Indicator selectIndex={selectIndex}>
          {itemData.picture_urls?.map((item, index) => {
            return (
              <div className="item">
                <span
                  className={classNames("dot", { active: selectIndex === index })}
                  key={item}
                ></span>
              </div>
            )
          })}
        </Indicator>
      </div>

      <Carousel dots={false} ref={sliderRef}>
        {itemData?.picture_urls?.map((item) => {
          return (
            <div className="cover" key={item}>
              <img src={item} alt="" />
            </div>
          )
        })}
      </Carousel>
    </div>
  )

  function itemClickHandle() {
    // console.log(itemData)
    // 跳转到详情页的操作放到store中去做，不放页面
    if (itemClick) itemClick(itemData) //itemClick传到entire-rooms中
    // 内部数据也可以通过itemData来传给entire-room
  }

  return (
    // 把desc的颜色作为属性来传进去
    <ItemWrapper
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemWidth={itemWidth}
      onClick={itemClickHandle}
    >
      <div className="inner">
        {/* 首页没有z展示轮播图的需求，而其他页面有，所以用一个三元判断 */}
        {!itemData.picture_urls ? pictureElement : sliderElement}

        <div className="desc">{itemData.verify_info.messages.join(" · ")}</div>
        <div className="name">{itemData.name}</div>
        <div className="price">¥{itemData.price}/晚</div>
      </div>

      <div className="bottom">
        <Rating
          value={itemData.star_rating ?? 5}
          readOnly
          sx={{ fontSize: "12px", color: itemData.star_rating_color }}
          precision={0.1}
        />
        <span className="count">{itemData.reviews_count}</span>
        {/* <span className="extra">·{itemData?.bottom_info?.content}</span> */}
        {itemData?.bottom_info && <span className="extra">·{itemData.bottom_info?.content}</span>}
      </div>
    </ItemWrapper>
  )
})

RoomItem.propTypes = {
  itemData: PropTypes.object,
}

export default RoomItem

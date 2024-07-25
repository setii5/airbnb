import React, { memo, useEffect, useRef } from "react"
import PropsTypes from "prop-types"
import { IndicatorWrapper } from "./style"

const Indicator = memo(function Indicator(props) {
  const { selectIndex = 0 } = props

  const contentRef = useRef()
  //   等组件渲染完后再执行useEffect
  useEffect(() => {
    // 看看是否每次都能拿到最新的东西
    console.log(selectIndex, "useEffect")

    // 1.获取selectIndex对应的item
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth

    // 2.content的宽度
    const contentWidth = contentRef.current.clientWidth
    const contentScroll = contentRef.current.scrollWidth

    // 3.获取selectIndex要滚动的距离
    // const distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5
    // console.log(distance) // distance得出的是负值
    let distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5
    console.log(distance)

    // 4.特殊边界情况的处理
    if (distance < 0) distance = 0 // 左边的特殊情况处理
    const totalDistance = contentScroll - contentWidth
    if (distance > totalDistance) distance = totalDistance // 右边的特殊情况处理

    // 5.改变对应的位置即可
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex])

  return (
    <IndicatorWrapper>
      <div className="i-content" ref={contentRef}>
        {props.children}
      </div>
    </IndicatorWrapper>
  )
})
Indicator.propsTypes = {
  selectIndex: PropsTypes.number,
}

export default Indicator

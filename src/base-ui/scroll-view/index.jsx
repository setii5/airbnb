import React, { memo, useEffect, useRef, useState } from "react"
// import PropTypes from "prop-types"
import { ViewWrapper } from "./style"
import IconArrowLeft from "src/assets/svg/icon-arrow-left"
import IconArrowRight from "src/assets/svg/icon-arrow-right"

const ScrollView = memo(function ScrollView(props) {
  /** 定义内部的状态 */
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [posIndex, setPosIndex] = useState(0)
  // useRef可以在组件进行多次渲染的时候保持一样的值
  const totalDistanceRef = useRef()

  /** 组件(/内容)渲染完毕，判断是否显示右侧的按钮 */
  const scrollContentRef = useRef()
  useEffect(() => {
    const scrollWidth = scrollContentRef.current.scrollWidth //一共可以滚动的宽度
    const clientWidth = scrollContentRef.current.clientWidth //本身占据的宽度
    const totalDistance = scrollWidth - clientWidth
    // 最终的目的是把totalDistance记录下来
    totalDistanceRef.current = totalDistance
    setShowRight(totalDistance > 0)
  }, [props.children])

  /** 事件处理的逻辑：点击右侧按钮将tabs向左边移动 */
  // function leftClickHandle() {
  //   const newIndex = posIndex - 1
  //   const newEl = scrollContentRef.current.children[newIndex]
  //   const newElOffsetLeft = newEl.offsetLeft
  //   scrollContentRef.current.style.transform = `translate(${newElOffsetLeft}px)`
  //   setPosIndex(newIndex)
  //   setShowLeft(totalDistanceRef.current > newElOffsetLeft)
  // }

  // function rightClickHandle() {
  function controlClickHandle(isRight) {
    const newIndex = isRight ? posIndex + 1 : posIndex - 1
    // const newIndex = posIndex + 1
    // 定义一个新元素,并查看能否拿到该元素
    const newEl = scrollContentRef.current.children[newIndex]
    // console.log(newEl, newEl.offsetLeft) //浏览器没拿到，黑人问号
    const newElOffsetLeft = newEl.offsetLeft
    scrollContentRef.current.style.transform = `translate(-${newElOffsetLeft}px)`
    // 记录索引更新后的位置
    setPosIndex(newIndex)
    // 是否继续显示在右侧的按钮
    setShowRight(totalDistanceRef.current > newElOffsetLeft)

    setShowLeft(newElOffsetLeft > 0)
  }

  return (
    <ViewWrapper>
      {showLeft && (
        <div className="control left" onClick={(e) => controlClickHandle(false)}>
          <IconArrowLeft />
        </div>
      )}
      {showRight && (
        <div className="control right" onClick={(e) => controlClickHandle(true)}>
          <IconArrowRight />
        </div>
      )}

      <div className="scroll">
        <div className="scroll-content" ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  )
})

ScrollView.propTypes = {}

export default ScrollView

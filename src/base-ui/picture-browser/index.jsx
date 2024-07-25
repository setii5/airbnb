import PropTypes from "prop-types"
import React, { memo, useEffect, useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import IconArrowLeft from "@/assets/svg/icon-arrow-left"
import IconArrowRight from "@/assets/svg/icon-arrow-right"
import IconClose from "@/assets/svg/icon-close"
import { BrowserWrapper } from "./style"
import Indicator from "../indicator"
import classNames from "classnames"
import IconTriangleArrowBottom from "@/assets/svg/icon-triangle-arrow-bottom"
import IconTriangleArrowTop from "src/assets/svg/icon-triangle-arrow-top"

const PictureBrowser = memo(function (props) {
  const { pictureUrls, closeClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isNext, setIsNext] = useState(true) //改成true方便测试
  const [showList, setShowList] = useState(true)

  // 副作用的代码
  // 当图片浏览器展示出来时，窗口滚动(滚动条)的功能消失
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  /** 事件处理的逻辑 */
  function closeBtnClickHandle() {
    if (closeClick) closeClick()
  }

  function controlClickHandle(isNext = true) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0) newIndex = pictureUrls.length - 1
    if (newIndex > pictureUrls.length - 1) newIndex = 0

    setCurrentIndex(newIndex)
    setIsNext(isNext)
  }

  // 点击小图跳转图片的不同动画效果逻辑
  function bottomItemClickHandle(index) {
    // 新点击的图片索引大于现在的索引，就true触发isNext的下一张动画效果，否则就false触发isNext的上一张动画效果
    setIsNext(index > currentIndex)

    setCurrentIndex(index)
  }

  return (
    // <BrowserWrapper>
    //   PictureBrowser: {pictureUrls.length}
    // </BrowserWrapper>
    // 下一步继续封装
    <BrowserWrapper isNext={isNext} showList={showList}>
      <div className="top">
        <div className="close-btn" onClick={closeBtnClickHandle}>
          <IconClose />
        </div>
      </div>
      <div className="slider">
        <div className="control">
          <div
            className="btn left"
            onClick={(e) => {
              controlClickHandle(false)
            }}
          >
            <IconArrowLeft width="77" height="77" />
          </div>
          <div
            className="btn right"
            onClick={(e) => {
              controlClickHandle(true)
            }}
          >
            <IconArrowRight width="77" height="77" />
          </div>
        </div>
        <div className="picture">
          <SwitchTransition mode="in-out">
            <CSSTransition key={pictureUrls[currentIndex]} classNames="pic" timeout={200}>
              <img src={pictureUrls[currentIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className="preview">
        <div className="info">
          <div className="desc">
            <div className="count">
              <span>
                {currentIndex + 1}/{pictureUrls.length}:
              </span>
              <span>room apartment图片{currentIndex + 1}</span>
            </div>
            <div className="toggle" onClick={(e) => setShowList(!showList)}>
              <span>{showList ? "隐藏" : "显示"}照片列表</span>
              {showList ? <IconTriangleArrowBottom /> : <IconTriangleArrowTop />}
            </div>
          </div>
          <div className="list">
            <Indicator selectIndex={currentIndex}>
              {pictureUrls.map((item, index) => {
                return (
                  <div
                    className={classNames("item", { active: currentIndex === index })}
                    key={item}
                    // 在使用 onClick 时包裹在箭头函数中，以避免无限循环渲染。
                    onClick={(e) => bottomItemClickHandle(index)}
                  >
                    <img src={item} alt="" />
                  </div>
                )
              })}
            </Indicator>
          </div>
        </div>
      </div>
    </BrowserWrapper>
  )
})

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array,
}
export default PictureBrowser

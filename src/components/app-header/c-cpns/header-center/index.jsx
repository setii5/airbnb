import React, { memo, useState } from "react"
// 两个组件之间切换内容用CSSTransition；switchTransition是同个组件中两个内容的切换用过
import { CSSTransition } from "react-transition-group"

import IconSearchBar from "@/assets/svg/icon-search-bar"
import SearchTitles from "@/assets/data/search_titles"
import SearchTabs from "./c-cpns/search-tabs"
import { CenterWrapper } from "./style"
import SearchSections from "./c-cpns/search-sections"

export default memo(function HeaderCenter(props) {
  // 为了传SearchTitles的title，对数据做一次过滤
  const titles = SearchTitles.map((item) => item.title)
  // 记录索引
  const [tabIndex, setTabIndex] = useState(0)

  // 父组件传进来isSearch，以及记录点击事件searchBarClick函数触发子组件的searchBarHandle
  const { isSearch, searchBarClick } = props

  /** 点击搜索框出现动画切换面板的逻辑：应该让父组件传进来点击事件*/
  function searchBarHandle() {
    // 先判断传进来有值的时候再调用，没值的时候传进来undefined一调用就报错了
    if (searchBarClick) searchBarClick()
  }

  return (
    <CenterWrapper>
      {/* isSearch为true默认展示，用三元判断。但是用上cssTransition+动画效果后就不需要三元判断了 */}
      {/* {!isSearch ? (
        <div className="search-bar" onClick={searchBarHandle}>
          <div className="text">搜索房源和体验</div>
          <div className="icon">
            <IconSearchBar />
          </div>
        </div>
      ) : (
        <div className="search-detail"> */}
      {/* titles需要传入的是一个数组 */}
      {/* <SearchTabs titles={[titles]} tabClick={setTabIndex} />

          <div className="infos">
            <SearchSections searchInfos={SearchTitles[tabIndex].searchInfos} />
          </div>
        </div>
      )} */}

      {/* unmountOnExit意思是退出时自动卸载这个组件：动画完成后 */}
      <CSSTransition in={!isSearch} classNames="bar" timeout={250} unmountOnExit={true}>
        <div className="search-bar" onClick={searchBarHandle}>
          <div className="text">搜索房源和体验</div>
          <div className="icon">
            <IconSearchBar />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={isSearch} classNames="detail" timeout={250} unmountOnExit={true}>
        <div className="search-detail">
          <SearchTabs titles={titles} tabClick={setTabIndex} />

          <div className="infos">
            <SearchSections searchInfos={SearchTitles[tabIndex].searchInfos} />
          </div>
        </div>
      </CSSTransition>
    </CenterWrapper>
  )
})

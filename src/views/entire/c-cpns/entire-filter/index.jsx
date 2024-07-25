import React, { memo, useState } from "react"
import { FilterWrapper } from "./style"
import FilterData from "@/assets/data/filter_data.json"
import classNames from "classnames"

export default memo(function EntireFilter() {
  const [selectItems, setSelectItems] = useState([])

  function itemClickHandle(item) {
    // 打印item值
    console.log(item)

    // 浅拷贝一份原数组
    const newItems = [...selectItems]
    if (newItems.includes(item)) {
      //移除选项操作
      // itemIndex用于存储选中项的索引
      const itemIndex = newItems.findIndex((filterItem) => filterItem === item)
      newItems.splice(itemIndex, 1)
    } else {
      //添加选项操作
      newItems.push(item)
    }

    setSelectItems(newItems)
  }

  return (
    <FilterWrapper>
      <div className="filter">
        {FilterData.map((item, index) => {
          return (
            <div
              // classNames的使用：用来定义和匹配.active状态的属性名
              className={classNames("item", { active: selectItems.includes(item) })}
              key={item}
              onClick={(e) => itemClickHandle(item)}
            >
              {item}
            </div>
          )
        })}
      </div>
    </FilterWrapper>
  )
})

import React, { memo, useState } from "react"
import { DemoWrapper } from "./style"
import Indicator from "src/base-ui/indicator"

const Demo = memo(function Demo(props) {
  const names = ["abc", "cba", "nba", "faf", "aaa", "bbb", "ccc", "ddd"]

  const [selectIndex, setSelectIndex] = useState(0)
  function toggleClickHandle(isNext = true) {
    // 记录新选中的索引
    let newIndex = isNext ? selectIndex + 1 : selectIndex - 1
    // newIndex < 0，等于最后一个
    if (newIndex < 0) newIndex = names.length - 1
    // newIndex > 最大值/最后值
    if (newIndex > names.length - 1) newIndex = 0
    setSelectIndex(newIndex)
    console.log(newIndex)
  }

  return (
    <DemoWrapper>
      <div className="control">
        <button onClick={(e) => toggleClickHandle(false)}>上一个</button>
        <button onClick={(e) => toggleClickHandle(true)}>下一个</button>
      </div>
      <div className="list">
        {/* 把从外面选中的selectIndex传到indicator */}
        <Indicator selectIndex={selectIndex}>
          {names?.map((item) => {
            return <button key={item}>{item}</button>
          })}
        </Indicator>
      </div>
    </DemoWrapper>
  )
})

export default Demo

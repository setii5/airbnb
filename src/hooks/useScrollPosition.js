import { useEffect, useState } from "react"
import { throttle } from "underscore"

export default function useScrollPosition() {
  // 状态来记录位置
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // 用副作用监听window滚动
  useEffect(() => {
    // 节流：通过安装underscore库来使用
    const handleScroll = throttle(function () {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }, 150)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // 返回数组不易解析出里面的方法
  return { scrollX, scrollY }
}

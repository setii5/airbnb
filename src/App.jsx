import React, { memo } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./router"
// import AppHeader from "./components/app-header"
import AppFooter from "./components/app-footer"
import useScrollTop from "./hooks/useScrollTop"

export default memo(function App() {
  useScrollTop()

  return (
    <div className="app">
      {/* AppHeader在不同的页面有不同的固定/不固定需求，所以在页面中单独做逻辑 */}
      {/* <AppHeader /> */}
      <div className="page">{useRoutes(routes)}</div>
      <AppFooter />
    </div>
  )
})

import React from "react"
import ReactDOM from "react-dom/client"

import { HashRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "./store"

import { ThemeProvider } from "styled-components"
import theme from "./assets/theme"

import App from "@/App"

import "normalize.css"
import "./assets/css/index.less"
// import "antd/dist/antd.less" //fuck,现在不用引入，直接npm i就行了

// @ => src:webpack
// 问题：react脚手架隐藏webpack
// 解决一：npm run eject(不推荐)
// 推荐二：craco => create-react-app config

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // 严格模式会导致控制台输出内容一次运行两遍
  // <React.StrictMode>

  <Provider store={store}>
    {/* 因为theme本身就是对象，所以不用{{}}两层 */}
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>

  // </React.StrictMode>
)

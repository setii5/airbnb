import styled from "styled-components"

export const HomeWrapper = styled.div`
  /* 技巧：加一个>符号，遇到同名的class，表示的是子元素 */
  > .content {
    width: 1032px;
    margin: 0 auto;
    
    > div {
      margin-top: 30px;
    }
  }

`

// 举个例子：
// 表示div的子元素span
// div > span {
// }

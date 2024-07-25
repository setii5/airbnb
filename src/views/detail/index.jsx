import React, { memo, useEffect } from "react"
import { DetailWrapper } from "./style"
import DetailInfos from "./c-cpns/detail-infos"
import DetailPictures from "./c-cpns/detail-pictures"
import { useDispatch } from "react-redux"
import { changeHeaderConfigAction } from "src/store/modules/main"
import AppHeader from "src/components/app-header"

export default memo(function Detail() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeHeaderConfigAction({ isFixed: false, topAlpha: false }))
  }, [dispatch])

  return (
    <DetailWrapper>
      <AppHeader />
      <DetailPictures />
      <DetailInfos />
    </DetailWrapper>
  )
})

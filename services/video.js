import { ggRequest } from "./index";

export function getTopMV (offset=0,limit=20) {
  return ggRequest.get({
    url: "/top/mv",
    data:{
      limit,
      offset
    }
  })
}

export function getMVUrl(id) {
    return ggRequest.get({
        url:"/mv/url",
        data:{
            id
        }
    })
}
export function getMVInfo(mvid) {
    return ggRequest.get({
        url:"/mv/detail",
        data:{
            mvid
        }
    })
}
export function getMVRelated(id) {
    return ggRequest.get({
        url:"/related/allvideo",
        data:{
            id
        }
    })
}

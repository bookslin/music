import {ggRequest} from "./index"
//歌曲
export function getSongDetail(ids) {
    return ggRequest.get({
        url:"/song/detail",
        data:{
            ids
        } 
    })
}

//歌词
export function getSongLyric(id) {
    return ggRequest.get({
        url:"/lyric",
        data:{
            id
        }
    })
}
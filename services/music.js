import {ggRequest } from "./index"
//轮播图
 export function getMusicBanner(type) {
     return ggRequest.get({
         url:'/banner',
         data:{
             type
         }
     }) 
 }

 //歌曲排行
 export function getRecommendSongs(id) {
     return ggRequest.get({
         url:'/playlist/detail', 
         data:{
             id
         }
     })
 }
 //歌单
 export function getSongMenuList(cat = "全部",limit = 8,offset = 0) {
     return ggRequest.get({
         url: "/top/playlist",
         data:{
             cat,
             limit,
             offset
         }
     })
 }
 //热门歌单
 export function getSongMenuTag() {
     return ggRequest.get({
         url:"/playlist/hot"

     })
 }
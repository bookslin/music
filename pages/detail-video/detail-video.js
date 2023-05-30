// pages/detail-video/detail-video.js
import {getMVUrl,getMVInfo,getMVRelated} from "../../services/video"

Page({
    data:{
        id:0,
        mvUrl:"",
        relatedVideo:[],
        related: "相关视频",
        danmuList:[
            {text: "nice" ,color:"red",time:3 },
            {text: "nice" ,color:"red",time:4 },
            {text: "nice" ,color:"red",time:5 },
        ],
        mvInfos:{}
    },
    onLoad(options) {
        const id = options.id
        this.setData({id})
        this.fetchMVUrl()
        this.fetchMVInfo()
        this.fetchMVRelated()
       
    },
     async fetchMVUrl(){
     const res= await getMVUrl(this.data.id)
     this.setData({mvUrl: res.data.url})
    },
    async fetchMVInfo(){
        const res= await getMVInfo(this.data.id)
        // console.log(res);
        this.setData({mvInfos: res.data})
       },
       async fetchMVRelated(){
        const res= await getMVRelated(this.data.id)
        this.setData({relatedVideo:res.data}) 
       }


})
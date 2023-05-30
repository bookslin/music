// pages/main-music/main-music.js
import {getMusicBanner,getSongMenuList} from "../../services/music"
import querySelect  from "../../utils/query-select"
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
import {throttle} from "underscore"

const querySelectThrottle = throttle(querySelect,100) 
Page({
    data: {
        searchValue:"",
        banners:[],
        bannerHeight:130,
        recommendSongs:[],
        //歌单数据
        hotMenuList:[],
        recMenuList:[],
        //巅峰榜数据
        rankingInfos:{
            
        }

    },
    onLoad() {
      this.fetchMusicBanner()
      this.fetchSongMenuList()
    //   this.fetchRecommendSongs()
    // 发起action   
    recommendStore.onState("recommendSongInfo",this.handleRecommendSongs )
    recommendStore.dispatch("fetchRecommendSongsAction")
    rankingStore.onState("newRanking",this.handleNewRanking)
    rankingStore.onState("originRanking",this.handleOriginRanking)
    rankingStore.onState("upRanking",this.handleUpRanking)
    rankingStore.dispatch("fetchRankingDataAction")
    },  

    // 网络请求方法的封装
    async fetchMusicBanner() {
        const res = await getMusicBanner()
        this.setData({banners: res.banners})
    },
    async fetchSongMenuList() {
        getSongMenuList().then(res => {
            this.setData({hotMenuList:res.playlists})   
        })
        getSongMenuList("华语").then(res => {
            this.setData({recMenuList:res.playlists})   
        })  
    },

    // async fetchRecommendSongs() {
    //     const res = await getRecommendSongs(3778678)
    //     const recommendSongs=res.playlist.tracks.slice(0,6)
    //     this.setData({recommendSongs})
    // },
    
    //界面事件监听
    onSearchClick() {
     wx.navigateTo({
       url: '/pages/detail-serach/detail-serach',
     })
    },

     onBannerImageLoad(event) {

    querySelectThrottle(".banner-image").then(res => {
        this.setData({bannerHeight: res[0].height})
    })
    },
    // 推荐歌单-更多
    onRecommendMoreClick() {
        wx.navigateTo({
          url: '/pages/detail-song/detail-song?type=recommend',
        })
    },


    //从Store获取数据
    handleRecommendSongs(value) {
        if (!value.tracks) return
            this.setData({recommendSongs:value.tracks.slice(0,6) })
    },
    handleNewRanking (value) {
        // console.log("新歌榜:",value);
        const newRankingInfos = {...this.data.rankingInfos, newRanking:value}
        this.setData({rankingInfos:newRankingInfos })
    },
    handleOriginRanking (value) {
        // console.log("原创榜:",value);
        const newRankingInfos = {...this.data.rankingInfos, originRanking:value}
        this.setData({rankingInfos:newRankingInfos })
    },
    handleUpRanking (value) {
        // console.log("飙升榜:",value);
        const newRankingInfos = {...this.data.rankingInfos, upRanking:value}
        this.setData({rankingInfos:newRankingInfos })
    },

    onUnload() {
        recommendStore.offState("recommendSongs",this.handleRecommendSongs)
    }
    
})
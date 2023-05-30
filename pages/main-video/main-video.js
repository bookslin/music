// pages/main-video/main-video.js
import {getTopMV} from "../../services/video"
Page({
    data:{
    
    videoList: [],
    offset: 0,
    hasMore:true
    },

    onLoad() {
      //发送网络请求
      this.fetchTopMV()
    },
      async fetchTopMV() {
        // getTopMV().then(res => {
        //   this.setData({videoList: res.data})
        //   })
          const res = await getTopMV(this.data.offset) 
        
          
         const newVideoList = [...this.data.videoList, ...res.data]

          this.setData({ videoList: newVideoList})
          this.data.offset = this.data.videoList.length
          this.data.hasMore = res.hasMore
      },
      // 监听下拉和上拉功能
      onReachBottom() {
        //   1判断是否有更多得数据
          if(!this.data.hasMore) return

        //   2如果有更多得数据,再请求更多得数据
          this.fetchTopMV()
      },
    async  onPullDownRefresh() {
          this.setData({videoList:[]})
          this.data.offset = 0
          this.data.hasMore = true
          
        await this.fetchTopMV()
        wx.stopPullDownRefresh()
      },
      onVideoItemTap(event) {
        const item = event.currentTarget.dataset.item
        console.log(item);
        wx.navigateTo({
          url: `/pages/detail-video/detail-video?id=${item.id}`,
        })
      }
  })
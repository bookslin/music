// pages/music-player/music-player.js
import {getSongDetail,getSongLyric} from "../../services/player"
const app = getApp()
//创建播放器
const audioContext =wx.createInnerAudioContext()

Page({
    data:{
        id:0,
        currentSong:{},
        lyricing:{},
        statusHeight:20,

        currentPage:0,
        contentHeight:0,
        currentTime:0,
        durationTime:0,
        sliderValue:0,
        isPlaying:false
    },
    onLoad(options) {
        //获取设备信息
        this.setData({
            statusHeight: app.globalData.statusHeight,
            contentHeight: app.globalData.contentHeight
        
        })

       //1.传入id数据
        const id = options.id
        this.setData({id})

        //2.根据id获取歌曲数据
        getSongDetail(id).then(res => {
            console.log(res);
            this.setData({
                currentSong:res.songs[0],
                durationTime:res.songs[0].dt
            })


        })
        //2.根据id获取歌词数据
        getSongLyric(id).then(res => {
            // console.log(res);
            this.setData({lyricing:res.lrc})
        })
        // 3.播放当前歌曲
        audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
        audioContext.autoplay =true
        // console.log(audioContext.duration);
        //监听播放进度
        audioContext.onTimeUpdate( () => {
           console.log("onTimeUpdate---");
            //记录当前时间
            this.setData({currentTime:audioContext.currentTime * 1000})
            //修改sliderValue
            const sliderValue= this.data.currentTime / this.data.durationTime * 100
            this.setData({sliderValue})
        })
        //点击滑块控制歌曲进度
        audioContext.onWaiting( () => {
            audioContext.pause()
        })
        audioContext.onCanplay( () => {
            audioContext.play()
        })

       
    },
     //歌曲和歌词的切换
     onSwiperChange(event){
        // console.log(event);
        this.setData({currentPage: event.detail.current})
      
    },
    onSliderChange(event) {
        // console.log(event);
        //获取点击滑块对应位置的value值
        const value = event.detail.value
        //计算出要播放的位置时间
        const currentTime = value /100  * this.data.durationTime 
        //设置播放器,播放计算出的时间
        audioContext.seek(currentTime / 1000)
        this.setData({currentTime})
    },
        onPlayOrPauseTap() {
        if (!audioContext.paused) {
            audioContext.pause()
            this.setData({ isPlaying:false})
        }else {
            audioContext.play()
            this.setData({ isPlaying:true})
        }
    }
   
})
Component({
  options: {
    virtualHost: true
  },
  externalClasses:['j-class'],
  lifetimes:{
    attached:function(){
      var that=this;
      if(this.data.size){
        this.setData({
          width:that.data.size,
          height:that.data.size
        })
      }
    }
  },
  properties: {
    src:{
      type:String,
      value:""
    },
    mode:{
      type:String,
      value:"scaleToFill"
    },
    lazyLoad:{
      type:Boolean,
      value:true
    },
    webp:{
      type:Boolean,
      value:false
    },
    showMenuByLongPress:{
      type:Boolean,
      value:false
    },
    height:{
      type:String,
      value:""
    },
    width:{
      type:String,
      value:""
    },
    style:{
      type:String,
      value:''
    },
    tapFunction:{
      type:String,
      value:'onClick'
    },
    navigateData:{
      type:Object,
      value:{
        appId:null,
        path:'../../packageCourseTable/pages/index/index'
      }
    },
    size:{
      type:String,
      value:''
    },
    wait:{
      type:Boolean,
      value:false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    visible:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadImage(e){
      this.setData({
        visible:true
      })
      this.triggerEvent('load',null);
    },
    previewImage(e){
      wx.previewImage({
        current:this.data.src,
        urls: [this.data.src],
      })
    },
    onClick(e){
      e.extra={}
      e.extra.src=this.data.src
      this.triggerEvent('onClick',{event:e});
    },
    navigateTo(){
      let that=this;
      console.log(this)
      if (!this.data.navigateData) {
        return;
      }
      if (this.data.navigateData.appId) {
        wx.navigateToMiniProgram({
          appId: that.data.navigateData.appId,
          extraData:that.data.navigateData.extraData,
          path:that.data.navigateData.path
        })
      }else if(this.data.navigateData.src){
        wx.navigateTo({
          url: '/pages/web-view/web-view?src='+this.data.navigateData.src,
        })
      }
      else{
        wx.navigateTo({
          url:that.data.navigateData.path,
          fail:e=>{
            wx.reLaunch({
              url: that.data.navigateData.path,
            })
          }
        })
      }
    },
    error(e){
      console.log(e)
    }
  }
})
import Life from "../../extension/liferestart/life";
import Property from "../../extension/liferestart/property";
import {
  allAge
} from "../../extension/liferestart/data/dataUtils";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: [],
    autoPlay:{
      level:0,
      id:null
    }
  },
  initialData(propertyMap, selectedTalentsID) {
    this.property = new Property(this);
    this.life = new Life(this)
    this.life.initial();
    this.life.restart({
      ...propertyMap,
      SPR: 5,
      TLT: selectedTalentsID,
    });
    this.nextAge()
  },
  nextAge() {
    if (this.data.isEnd !== true) {
      let trajectory = this.life.next()
      let {
        isEnd
      } = trajectory
      this.data.events.push(trajectory)
      const newprop = this.life.getLastRecord()
      this.setData({
        events: this.data.events,
        ...newprop,
        isEnd: isEnd,
        scrollView:`scrollView${this.data.events.length-1}`
      })
      if (isEnd&&this.data.autoPlay.id) {
        clearInterval(this.data.autoPlay.id)
      }
    }
  },
  onLoad: function (options) {
    let {
      source,
      selectedid: selectedTalentsID
    } = options
    source = JSON.parse(source)
    selectedTalentsID = JSON.parse(selectedTalentsID)
    this.initialData(source, selectedTalentsID)
  },
  autoPlay(){
    let {autoPlay}=this.data;
    switch(autoPlay.level){
      case 0:
        autoPlay.level++;
        autoPlay.id=setInterval(()=>{
          this.nextAge();
        },600)
        break;
      case 1:
        clearInterval(autoPlay.id)
        autoPlay.level++;
        autoPlay.id=setInterval(()=>{
          this.nextAge();
        },300)
        break;
      case 2:
        clearInterval(autoPlay.id)
        autoPlay.level=0
        autoPlay.id=null
        break;
      default:
        break;
    }
    this.setData({
      autoPlay:autoPlay
    })
  },
  toSummary(e) {
    wx.setStorage({
        key: 'currentRecord',
        data: this.life.getRecord()
    })
    wx.setStorage({
      key: 'trajectory',
      data: this.data.events
    })
    wx.redirectTo({
      url: '../summary/summary'
    })
  },
  onShareAppMessage: function () {

  }
})
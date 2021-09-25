// miniprogram/pages/liferestart/talents.js
// 颜值 charm CHR
// 智力 intelligence INT
// 体质 strength STR
// 家境 money MNY
// 快乐 spirit SPR
// 生命 life LIF
// 天赋 talent TLT
// 事件 event EVT
Array.prototype.remove = function (val) {
  let resIndex = -1;
  if (val instanceof Object) {
    val = JSON.stringify(val);
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      if (JSON.stringify(element) == val) {
        resIndex = index;
        break;
      }
    }
  } else {
    resIndex = this.indexOf(val);
  }
  if (resIndex > -1) {
    this.splice(resIndex, 1);
  }
};
import {randomTalents,computeTalentsStatus, computeUseableProp, randomProp} from '../../extension/liferestart/data/dataUtils';
Page({
  setShow(){
    this.setData({
      showTalents:true
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    talentsArray: [],
    selectedTalentsID:[],
    selectedTalents:[],
    talentCanTap:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.clearStorage()
    this.loadTalents()
  },
  
  /**
   * 清除本地缓存以及数据
   */
  clearStorage: function() {
    this.setData({
      talentsArray: [],
      selectedTalentsID: [],
      selectedTalents: []
    })
    wx.removeStorageSync('currentRecord')
    wx.removeStorageSync('trajectory')
  },
  /**
   * 从天赋中随机取10条并载入talentsArray
   */
  loadTalents: function() {
    const showTalents = randomTalents(10)
    this.setData({
      talentsArray: showTalents
    })
  },
  talentChoose(e){
    let {selectedTalents}=this.data
    if (e.detail.choose) {
      selectedTalents.push(e.detail.source)
    }else{
      selectedTalents.remove(e.detail.source)
    }
    this.setData({
      selectedTalents:selectedTalents
    })
  },
  talentContain(e){
    if (this.data.selectedTalentsID.length>=3) {      
      wx.showToast({
        title: '你最多选择3个天赋哦',
        icon:'none'
      })
    }
  },
  startLife(e){
    if (this.data.selectedTalents.length<3) {
      wx.showToast({
        title: '您还没选完3个天赋哦',
        icon:'none'
      })
      return;
    }
    wx.redirectTo({
      url: `../property/property?source=${encodeURIComponent(JSON.stringify(this.data.selectedTalents))}`,
    })
  }
})
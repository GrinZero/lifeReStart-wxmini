import {randomTalents,computeTalentsStatus, computeUseableProp, randomProp} from '../../extension/liferestart/data/dataUtils';
Page({
  data: {
    
  },
  onLoad: function (options) {
    let {
      source: selectedTalents
    } = options;
    selectedTalents = JSON.parse(decodeURIComponent(selectedTalents))
    this.computeProperty(selectedTalents)
  },
  computeProperty(selectedTalents){
    const selectedTalentsID = selectedTalents.map(item => item._id);
    const status = computeTalentsStatus(selectedTalents)
    var proNum = computeUseableProp(20, status)
    this.setData({
      propertyMaxInit: proNum,
      propertyRe: proNum,
      selectedTalents: selectedTalents,
      selectedTalentsID: selectedTalentsID
    })
  },
  finishProperty(e){
    let {source,property}=e.detail
    if (property==this.data.propertyMaxInit) {
      this.data.source=source
      console.log(source)
    }
    this.data.propertyRe=this.data.propertyMaxInit-property
  },
  startNewLife(e){
    if (this.data.propertyRe!=0) {
      wx.showToast({
        title: `你还有${this.data.propertyRe}属性点没有分配完`,
        icon:'none'
      })
      return;
    }
    let reData={}
    for (const key in this.data.source) {
      const element = this.data.source[key];
      reData[key]=element.value
    }
    wx.redirectTo({
      url: `../run/run?source=${JSON.stringify(reData)}&selectedid=${JSON.stringify(this.data.selectedTalentsID)}`,
    })
  },
  onShareAppMessage: function () {

  }
})
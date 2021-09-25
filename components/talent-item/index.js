Component({
  externalClasses:['j-class'],
  properties: {
    source:{
      type:Object,
      value:{}
    },
    canTap:{
      type:Boolean,
      value:true
    }
  },
  data: {
    choose:false
  },
  methods: {
    handleClick(){
      let {choose,canTap}=this.data;
      if (!choose&&!canTap) {
        return;
      }
      this.setData({
        choose:!choose
      })
      this.triggerEvent('talentChoose',{_id:this.data.source._id,choose:!choose,source:this.data.source})
    }
  }
})

import {randomProp} from '../../extension/liferestart/data/dataUtils';
Component({
  lifetimes:{
    ready(e){
      this.init()
    }
  },
  properties: {
    initMaxProperty: {
      type: Number,
      value: 0
    }
  },
  data: {
  },
  methods: {
    init(){
      this.setData({
        propertyMap:{
          CHR: {
            name: "颜值",
            max: 10,
            value: 0
          },
          INT: {
            name: "智力",
            max: 10,
            value: 0
          },
          STR: {
            name: "体质",
            max: 10,
            value: 0
          },
          MNY: {
            name: "家境",
            max: 10,
            value: 0
          }
        },
        property:0
      })
    },
    controlValue(e) {
      let {
        func,
        index
      } = e.currentTarget.dataset
      let {
        initMaxProperty,
        property
      } = this.data
      let propertyItem = this.data.propertyMap[index]
      if (func === "+" && (initMaxProperty - property) > 0) {
        if (propertyItem.value < propertyItem.max) propertyItem.value++, property++
      } else if (func === "-") {
        if (propertyItem.value > 0) propertyItem.value--, property--
      }
      this.triggerEvent('finishProperty',{source:this.data.propertyMap,property:property})
      this.setData({
        [`propertyMap.${index}.value`]: propertyItem.value,
        property: property
      })
    },
    randomProperty(e) {
      let {propertyMap}=this.data
      const arr = randomProp(this.data.initMaxProperty, [10,10,10,10])
      let index=0;
      for (const key in propertyMap) {
        const element = propertyMap[key];
        element.value=element.max-arr[index]
        index++;
      }
      this.setData({
        propertyMap,
        property:this.data.initMaxProperty
      })
      this.triggerEvent('finishProperty',{source:propertyMap,property:this.data.property})
    },
    clearProperty(e){
      this.init();
    }
  }
})
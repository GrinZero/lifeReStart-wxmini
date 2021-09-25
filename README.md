# 人生重开模拟器--小程序版

## 简介

- 根据[人生重开模拟器](https://github.com/VickScarlet/lifeRestart)整的微信小程序版
- 数据和核心逻辑代码均采用VickScarlet版

## 使用说明

>  我希望这是一个开箱即用的一个小程序包，做的时候我尝试利用微信小程序的分包机制把这玩意儿打包；

1. 首先在`app.json`这里可以直接复制下边的黏贴上去：

```json
"subPackages": [
    {
      "root": "packageLifeRestart",
      "name": "lifeRestart",
      "pages": [
        "pages/index/index",
        "pages/start/start",
        "pages/property/property",
        "pages/run/run",
        "pages/summary/summary"
      ]
    }
  ],
```

2. 把包复制到和`pages`同级
3. 编译，可以跑惹

## ToDo

- 成就
- 历史
- 排行榜
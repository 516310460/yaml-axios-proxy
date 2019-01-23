import Vue from 'vue'
import { Notification, Message } from 'element-ui'
import zhCN from '~/locales/zh-CN.js'
import zhTW from '~/locales/zh-TW.js'
import enUS from '~/locales/en-US.js'
// 公共函数对象..
const commonFn = {

  // 当前的语言..
  currentLanguage(locale) {
    let currentLanguage = ''
    switch (locale) {
      case 'zh-CN':
        currentLanguage = zhCN
        break
      case 'zh-TW':
        currentLanguage = zhTW
        break
      case 'en-US':
        currentLanguage = enUS
        break
    }
    return currentLanguage
  },

  // 消息提示
  TipsMessage(Msg = '', Type = 'warning', Time = 3000, IsCenter = true, IsHTML = false) {
    Message({
      type: Type,
      center: IsCenter,
      duration: Time,
      dangerouslyUseHTMLString: IsHTML,
      message: Msg
    })
  },

  // 消息通知
  TipsNotification(locale, msg) {
    let Language = commonFn.currentLanguage(locale)
    let NotificationMSG = Language.Plugins.commonFn.TipsNotification
    Notification.success({
      title: NotificationMSG.title,
      position: 'bottom-right',
      dangerouslyUseHTMLString: true,
      offset: 40,
      message: msg
    })
  },

  // 根据币种id , 渲染币种文本..
  renderCurrencyText: (id) => {
    let str = ''
    let NumberID = Number(id)
    switch (NumberID) {
      case 1:
        str = 'BTC'
        break
      case 2:
        str = 'EOS'
        break
      case 3:
        str = 'BCH'
        break
      case 4:
        str = 'ETH'
        break
      case 5:
        str = 'ETC'
        break
      case 6:
        str = 'XBIT'
        break
    }
    return str
  },

  // 过滤非数字的字符串, 只保留数字.
  filterStrRetainNumber: (obj, dataAttr) => {
    if (dataAttr.indexOf('.') >= 0) {
      let arr = dataAttr.split('.')
      let val = obj[arr[0]][arr[1]].replace(/[^\d]/g, '')
      obj[arr[0]][arr[1]] = val
    } else {
      let val = obj[dataAttr].replace(/[^\d]/g, '')
      obj[dataAttr] = val
    }
  },

  // 返回时间格式 '2018-06-06 15:00:00'
  getCurrentTime: () => {
    let time = new Date()
    let year = time.getFullYear()
    let mouth = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    let minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    let seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()

    return year + '-' + mouth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  },

  // 限制输入的数字..
  limitInputNum: (value, before, after, state = true) => {
    // input框的类型必须是text...
    // value,输入框传输的值..
    // before,指定小数点前面的位数..
    // after, 指定小数点后面的位数..
    // state, 是否可以输入小数点, 默认为true,可以输入小数点..false, 不能输入小数点.
    value = value.toString().replace('。', '.')
    let newBefore = parseFloat(before)
    let newAfter = parseFloat(after)
    value = value.replace(/[^ \d.]|\s|^\./g, '')
    value = value.replace(/^0{2,}/g, '0')
    if (state) {
      value = value.replace(/\.{2,}/g, '.')
    } else {
      value = value.replace(/\./g, '')
    }
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    if (value.indexOf('.') >= 0) {
      value = value.split('.')[0].slice(0, newBefore) + '.' + value.split('.')[1].slice(0, newAfter)
      return value
    } else {
      value = value.slice(0, newBefore)
      return parseFloat(value) || value
    }
  },

  // 消息中心状态，返回文本..
  MessageBroadcasting(data, TextState = false, userId, userName, locale) {
    let orderMsg = ''
    let toData = ''
    let url = ''
    let state = ''
    let OrderNumber = data.extendData
    let Language = commonFn.currentLanguage(locale)
    let Broadcasting = Language.Plugins.commonFn.MessageBroadcasting
    if (userId === data.from.id) {
      toData = data.msgCenterExtendData.fromData
      url = toData.fromUrl
      state = toData.code
    } else {
      toData = data.msgCenterExtendData.toData
      url = toData.toUrl
      state = toData.code
    }
    let ToName = data.to.name === userName ? data.from.name : data.to.name
    switch (state) {
      // OTC
      case 'msg_otc_001':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_001_1}${toData.adId}${Broadcasting.msg_otc_001_2}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_001_3}${OrderNumber}${Broadcasting.msg_otc_001_4}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_001_1}${toData.adId}${Broadcasting.msg_otc_001_2}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_001_3}${OrderNumber}${Broadcasting.msg_otc_001_4}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_002':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_002_1}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_002_2}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_002_1}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_002_2}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_003':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_003_1}${OrderNumber}${Broadcasting.msg_otc_003_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_003_1}${OrderNumber}${Broadcasting.msg_otc_003_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_004':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_004_1}${OrderNumber}${Broadcasting.msg_otc_004_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_004_1}${OrderNumber}${Broadcasting.msg_otc_004_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_005':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_005_1}${OrderNumber}${Broadcasting.msg_otc_005_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_005_1}${OrderNumber}${Broadcasting.msg_otc_005_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_006':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_006_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_006_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_007':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_007_1}${OrderNumber}${Broadcasting.msg_otc_007_2}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_007_3}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_007_1}${OrderNumber}${Broadcasting.msg_otc_007_2}<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_007_3}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_008':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_008_1}${OrderNumber}${Broadcasting.msg_otc_008_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_008_1}${OrderNumber}${Broadcasting.msg_otc_008_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_009':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_009_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_009_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_010':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_010_1}${OrderNumber}${Broadcasting.msg_otc_010_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_otc_010_1}${OrderNumber}${Broadcasting.msg_otc_010_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_011':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_011_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_011_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_otc_012':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_otc_012_1}${OrderNumber}${Broadcasting.msg_otc_012_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_otc_012_1}${OrderNumber}${Broadcasting.msg_otc_012_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      // 一口价
      case 'msg_fixprice_001':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_001_1}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `${orderMsg}`)
        }
        break
      case 'msg_fixprice_002':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_002_1}${OrderNumber}${Broadcasting.msg_fixprice_002_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_003':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_003_1}${OrderNumber}${Broadcasting.msg_fixprice_003_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_004':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_004_1}${OrderNumber}${Broadcasting.msg_fixprice_004_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_005':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_005_1}${OrderNumber}${Broadcasting.msg_fixprice_005_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_006':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_006_1}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_007':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_007_1}${OrderNumber}${Broadcasting.msg_fixprice_007_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_008':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_009':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.msg_fixprice_009_1}${OrderNumber}${Broadcasting.msg_fixprice_009_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_010':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_010_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'msg_fixprice_011':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_011_1}${OrderNumber}${Broadcasting.msg_fixprice_011_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case  'msg_fixprice_012':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_012_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case  'msg_fixprice_013':
        if (TextState) {
          orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.msg_fixprice_013_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      // 集合竞价
      case 'mgs_callAuction_001':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_001_1}${toData.tnum}${Broadcasting.mgs_callAuction_001_2}${toData.amount}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_001_1}${toData.tnum}${Broadcasting.mgs_callAuction_001_2}${toData.amount}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `${orderMsg}`)
        }
        break
      case 'mgs_callAuction_002':
        if (TextState) {
          if(locale == 'en-US') {
            orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${Broadcasting.mgs_callAuction_002_3}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
          }
        } else {
          if(locale == 'en-US') {
            orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
          } else {
            orderMsg = `${Broadcasting.mgs_callAuction_002_1}${toData.tnum}${Broadcasting.mgs_callAuction_002_2}${toData.amount}${Broadcasting.mgs_callAuction_002_3}${toData.launchCoin}${Broadcasting.mgs_callAuction_002_4}${toData.surplus}${toData.launchCoin}${Broadcasting.msg_Symbol_001}`
          }
          this.TipsNotification(locale, `${orderMsg}`)
        }
        break
      case 'mgs_callAuction_003':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_003_1}${toData.tnum}${Broadcasting.mgs_callAuction_003_2}${toData.orderId}${Broadcasting.mgs_callAuction_003_3}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_004':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_004_1}${OrderNumber}${Broadcasting.mgs_callAuction_004_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_004_1}${OrderNumber}${Broadcasting.mgs_callAuction_004_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_005':
        if (TextState) {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.mgs_callAuction_005_1}${OrderNumber}${Broadcasting.mgs_callAuction_005_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `<span style='color:#52a860'>${ToName}</span>${Broadcasting.mgs_callAuction_005_1}${OrderNumber}${Broadcasting.mgs_callAuction_005_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_006':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_006_1}${OrderNumber}${Broadcasting.mgs_callAuction_006_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_006_1}${OrderNumber}${Broadcasting.mgs_callAuction_006_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_007':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_007_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_007_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_008':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_008_1}${OrderNumber}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `<a href='${url}'>${orderMsg}</a>`)
        }
        break
      case 'mgs_callAuction_009':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_009_1}${OrderNumber}${Broadcasting.mgs_callAuction_009_2}${Broadcasting.msg_Symbol_001}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_009_1}${OrderNumber}${Broadcasting.mgs_callAuction_009_2}${Broadcasting.msg_Symbol_001}`
          this.TipsNotification(locale, `${orderMsg}`)
        }
        break
      case 'mgs_callAuction_010':
        if (TextState) {
          orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`
        } else {
          orderMsg = `${Broadcasting.mgs_callAuction_010_1}${toData.tnum}${Broadcasting.mgs_callAuction_010_2}${toData.launchCoin}${Broadcasting.mgs_callAuction_010_3}${toData.amount}${Broadcasting.mgs_callAuction_010_4}`
          this.TipsNotification(locale, `${orderMsg}`)
        }
        break
      default:
        return
    }
    return orderMsg
  },

  // 根据集合竞价信息状态，返回文本..
  AggregateOrderMsg: (state, role, locale) => {
    let orderMsg = ''
    let Language = commonFn.currentLanguage(locale)
    let OrderMsg = Language.Plugins.commonFn.AggregateOrderMsg
    switch (state) {
      case 1:
        role ? orderMsg = OrderMsg.state1_1 : orderMsg = OrderMsg.state1_2
        break
      case 2:
        role ? orderMsg = OrderMsg.state2_1 : orderMsg = OrderMsg.state2_2
        break
      case 3:
        orderMsg = OrderMsg.state3
        break
      default:
        orderMsg = OrderMsg.error
    }
    return orderMsg
  },

  // 根据订单信息状态, 返回文本..
  initOrderMsg: (state, role, text, currency, locale, IsBusiness) => {
    let orderMsg = ''
    let Language = commonFn.currentLanguage(locale)
    let OrderMsg = Language.Plugins.commonFn.initOrderMsg
    switch (state) {
      case 1:
        if (IsBusiness == 1) {
          if (role === 'buy') {
            orderMsg = OrderMsg.state0_1
          } else {
            orderMsg = OrderMsg.state0_2
          }
        } else {
          if (role === 'buy') {
            orderMsg = OrderMsg.state0_3
          } else {
            orderMsg = OrderMsg.state0_4
          }
        }
        break
      case 2:
        role === 'buy' ? orderMsg = OrderMsg.state2_1 : orderMsg = text + OrderMsg.state2_2
        break
      case 4:
        role === 'buy' ? orderMsg = OrderMsg.state4_1 : orderMsg = OrderMsg.state4_2
        break
      case 5:
        role === 'buy' ? orderMsg = OrderMsg.state5_1 : orderMsg = text + OrderMsg.state5_2
        break
      case 6:
        role === 'buy' ? orderMsg = OrderMsg.state6_1 + currency + OrderMsg.state6_2 : orderMsg = OrderMsg.state6_3 + currency + OrderMsg.state6_4 + currency
        break
      case 7:
        role === 'buy' ? orderMsg = OrderMsg.state7_1 : orderMsg = OrderMsg.state7_2
        break
      case 8:
        orderMsg = OrderMsg.state8_1
        break
      case 9:
        orderMsg = OrderMsg.state9_1
        break
      case 10:
        orderMsg = OrderMsg.state10_1
        break
      default:
        orderMsg = OrderMsg.error
    }
    return orderMsg
  }

}
Vue.use(commonFn)
Vue.prototype.commonFn = commonFn

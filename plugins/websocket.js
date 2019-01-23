let im = {}
let ImRouteState = ''

// websocket的访问地址的访问地址..
im.webSocketUrl = process.env.webSocketUrl;

im.webSocketHttpUrl = process.env.webSocketHttpUrl;

// 图片的服务器地址..
im.imgServerUrl = process.env.imgServerUrl

im.namespace = {
  LOGIN_REGIST: 'login_regist',
  GUEST_REGIST: 'guest_regist'
}

im.msgType = {
  TEXTMSG: 1,
  CMDMSG: 2,
  ALERTMSG: 3,
  ORDERMSG: 4
}

// 匿名用户功能注册
im.guestRegistFunction = {
  // 币种参考价变动推送功能
  MARKET_DETAIL_EXCHANGE: 'MARKET_DETAIL_EXCHANGE',
  MARKET_DETAIL_FIXPRICECHANGE: 'MARKET_DETAIL_FIXPRICECHANGE'
}

im.symbol = {
  ALLSYMBOL: 'allsymbol',
  BTCCNY: 'btccny',
  BCHCNY: 'bchcny',
  ETHCNY: 'ethcny',
  USDTCNY: 'usdtcny'
}

// debug:false 不显示console信息，反之则显示
im.setting = {
  debug: false,
  wsurl: im.webSocketUrl + '/api/v1/bitbuy/im/websocket',
  defaultCallBack: {
    onerror(event) {
      im.showShowConsole('发生错误!' + event)
    },
    onopen(event) {
      im.showShowConsole('注册成功!' + event)
    },
    onmessage(event) {
      im.showShowConsole('收到消息!' + event)
      im.setting.messageDriver(JSON.parse(event.data))
    },
    onclose(event) {
      im.showShowConsole('链接断开!' + event)
      ImRouteState = true
    },
    onalertmessage(immsg) {
      if (!!immsg) {
        alert(immsg.textMsg)
      }
    },
    oncmdmessage(immsg) {
      if (!!immsg) {
        im.evalfunction(immsg.functionName, immsg)
      }
    },
    ontextmessage(immsg) {
      if (!!immsg) {
        im.showShowConsole('收到文本消息:' + immsg.textMsg)
      }
    },
    onordermessage(immsg) {
      if (!!immsg) {
        im.showShowConsole('收到订单消息:' + immsg.textMsg)
      }
    }
  },
  messageDriver(immsg) {
    if (!!immsg) {
      switch (immsg.msgType) {
        case im.msgType.TEXTMSG:
          im.setting.defaultCallBack.ontextmessage(immsg)
          break
        case im.msgType.CMDMSG:
          im.setting.defaultCallBack.oncmdmessage(immsg)
          break
        case im.msgType.ALERTMSG:
          im.setting.defaultCallBack.onalertmessage(immsg)
          break
        case im.msgType.ORDERMSG:
          im.setting.defaultCallBack.onordermessage(immsg)
          break
        default:
          break
      }
    }
  }
}
im.init = (param) => {
  let paramTxt = im.validate.initValidate(param)
  im.initparam = param
  if (!!paramTxt) {
    if ('WebSocket' in window) {
      try {
        im.websocket = new WebSocket(im.setting.wsurl + paramTxt)
      } catch (e) {
        // console.log('socket链接发生错误!')
      }
    } else {
      im.showShowConsole('您的浏览器不知websocket!请升级或更换浏览器再试')
      return
    }
    // 连接发生错误的回调方法
    im.websocket.onerror = function (event) {
      im.setting.defaultCallBack.onerror(event)
    }
    // 连接成功建立的回调方法
    im.websocket.onopen = function (event) {
      im.setting.defaultCallBack.onopen(event)
      im.heartBit.start()
    }
    // 接收到消息的回调方法
    im.websocket.onmessage = function (event) {
      im.setting.defaultCallBack.onmessage(event)
      im.heartBit.start()
    }
    // 连接关闭的回调方法
    im.websocket.onclose = function (event) {
      im.setting.defaultCallBack.onclose(event)
      if (!ImRouteState) {
        im.init(im.initparam)
      }
    }
  }
}
im.showShowConsole = (msg) => {
  if (im.setting.debug) {
    // console.log(msg)
  }
}
im.validate = {}
// 注册参数校验
im.validate.initValidate = (param) => {
  let paramTxt = ''
  if (!!param) {
    if (!!param.namespace) {
      // 订单聊天websocket参数校验
      if (im.namespace.LOGIN_REGIST === param.namespace) {
        if (!!param.token) {
          paramTxt = '?token=' + param.token + '&namespace=' + im.namespace.LOGIN_REGIST
        } else {
          im.showShowConsole('登录token为必传参数!')
        }
      } else if (im.namespace.GUEST_REGIST === param.namespace) {
        paramTxt = '?namespace=' + im.namespace.GUEST_REGIST
        let guestRegistFunction = param.guestRegistFunction
        if (!!guestRegistFunction) {
          paramTxt = paramTxt + '&guestRegistFunction=' + guestRegistFunction
          if (guestRegistFunction === im.guestRegistFunction.MARKET_DETAIL_EXCHANGE) {
            let symbol = !!param.symbol ? param.symbol : im.symbol.ALLSYMBOL
            paramTxt = paramTxt + '&symbol=' + symbol
          }
        } else {
          im.showShowConsole('匿名用户注册必须传递所用功能点!')
        }
      } else {
        im.showShowConsole('命名空间不存在!')
      }
    } else {
      im.showShowConsole('命名空间为必传参数!')
    }
  } else {
    im.showShowConsole('必要参数未传递!')
  }
  return paramTxt
}

im.evalfunction = (funcName, immsg) => {
  if (typeof (eval(funcName)) === 'function') {
    window[funcName](immsg)
  } else {
    im.showShowConsole('方法不存在!')
  }
}
im.close = () => {
  if (im.websocket != null) {
    im.websocket.close()
    im.showShowConsole('断开成功!')
  } else {
    im.showShowConsole('socket未连接!')
  }
}
im.heartBit = {
  timeout: 3000,
  heart_timer: null,
  server_timer: null,
  start: () => {
    if (!!im.heartBit.heart_timer) {
      clearTimeout(im.heartBit.heart_timer)
    }
    if (!!im.heartBit.server_timer) {
      clearTimeout(im.heartBit.server_timer)
    }
    im.heartBit.heart_timer = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      if (!ImRouteState) {
        im.websocket.send('{\'ping\':' + new Date().getTime() + '}')
        im.heartBit.server_timer = setTimeout(() => {
          // console.log(im.websocket)
          if (im.websocket !== null) {
            im.websocket.close()
            if (!!im.initparam) {
              im.init(im.initparam)
              // console.log('重新连接')
            }
          }
        }, im.heartBit.timeout)
      }
    }, im.heartBit.timeout)
  }
}

export default im

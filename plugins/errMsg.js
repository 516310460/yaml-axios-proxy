import localezhCN from "../locales/zh-CN";
import localezhTW from "../locales/zh-TW";
let _arr = [];
const _temp = function(locale) {
  switch (locale) {
    case "zh-CN":
      return (_arr = zhCN);
      break;
    case "zh-TW":
      return (_arr = zhTW);
      break;
    case "en-US":
      return (_arr = enUS);
      break;
  }
};

let zhCN = [
  {
    code: 500,
    cnMsg: localezhCN.Plugins.errMsg.errmsg500,
    enMsg: "System exception"
  },
  {
    code: 404,
    cnMsg: localezhCN.Plugins.errMsg.errmsg404,
    enMsg: "The request does not exist"
  },
  {
    code: 4000,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4000,
    enMsg: " Not null"
  },
  {
    code: 4001,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4001,
    enMsg: "The length is too short"
  },
  {
    code: 4002,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4002,
    enMsg: "The length is too long"
  },
  {
    code: 4003,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4003,
    enMsg: "Only for numbers"
  },
  {
    code: 4004,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4004,
    enMsg: "No special characters can be included"
  },
  {
    code: 4005,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4005,
    enMsg: "Incorrectly formatting"
  },
  {
    code: 4006,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4006,
    enMsg: "It needs to include letters and numbers"
  },
  {
    code: 4007,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4007,
    enMsg: "Can't be lower than the minimum limit"
  },
  {
    code: 4008,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4008,
    enMsg: "Cannot be higher than the maximum limit"
  },
  {
    code: 4009,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4009,
    enMsg: "The advertising agreement must be agreed to first"
  },
  {
    code: 4010,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4010,
    enMsg: "The user agreement must be agreed to first"
  },
  {
    code: 4011,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4011,
    enMsg: "A business agreement must be agreed to first"
  },
  {
    code: 4012,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4012,
    enMsg: "The operation is too frequent. Please try again later"
  },
  {
    code: 4013,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4013,
    enMsg: "Operation timeout"
  },
  {
    code: 4014,
    cnMsg: localezhCN.Plugins.errMsg.errmsg4014,
    enMsg: "The length should be 8 to 20,and not all number"
  }
];
let zhTW = [
  {
    code: 500,
    cnMsg: localezhTW.Plugins.errMsg.errmsg500,
    enMsg: "System exception"
  },
  {
    code: 404,
    cnMsg: localezhTW.Plugins.errMsg.errmsg404,
    enMsg: "The request does not exist"
  },
  {
    code: 4000,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4000,
    enMsg: " Not null"
  },
  {
    code: 4001,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4001,
    enMsg: "The length is too short"
  },
  {
    code: 4002,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4002,
    enMsg: "The length is too long"
  },
  {
    code: 4003,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4003,
    enMsg: "Only for numbers"
  },
  {
    code: 4004,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4004,
    enMsg: "No special characters can be included"
  },
  {
    code: 4005,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4005,
    enMsg: "Incorrectly formatting"
  },
  {
    code: 4006,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4006,
    enMsg: "It needs to include letters and numbers"
  },
  {
    code: 4007,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4007,
    enMsg: "Can't be lower than the minimum limit"
  },
  {
    code: 4008,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4008,
    enMsg: "Cannot be higher than the maximum limit"
  },
  {
    code: 4009,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4009,
    enMsg: "The advertising agreement must be agreed to first"
  },
  {
    code: 4010,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4010,
    enMsg: "The user agreement must be agreed to first"
  },
  {
    code: 4011,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4011,
    enMsg: "A business agreement must be agreed to first"
  },
  {
    code: 4012,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4012,
    enMsg: "The operation is too frequent. Please try again later"
  },
  {
    code: 4013,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4013,
    enMsg: "Operation timeout"
  },
  {
    code: 4014,
    cnMsg: localezhTW.Plugins.errMsg.errmsg4014,
    enMsg: "The length should be 8 to 20,and not all number"
  }
];
let enUS = [
  {
    code: 500,
    cnMsg: "System exception"
  },
  {
    code: 404,
    cnMsg: "The request does not exist"
  },
  {
    code: 4000,

    cnMsg: " Not null"
  },
  {
    code: 4001,

    cnMsg: "The length is too short"
  },
  {
    code: 4002,

    cnMsg: "The length is too long"
  },
  {
    code: 4003,
    cnMsg: "Only for numbers"
  },
  {
    code: 4004,
    cnMsg: "No special characters can be included"
  },
  {
    code: 4005,
    cnMsg: "Incorrectly formatting"
  },
  {
    code: 4006,
    cnMsg: "It needs to include letters and numbers"
  },
  {
    code: 4007,
    cnMsg: "Can't be lower than the minimum limit"
  },
  {
    code: 4008,
    cnMsg: "Cannot be higher than the maximum limit"
  },
  {
    code: 4009,
    cnMsg: "The advertising agreement must be agreed to first"
  },
  {
    code: 4010,
    cnMsg: "The user agreement must be agreed to first"
  },
  {
    code: 4011,
    cnMsg: "A business agreement must be agreed to first"
  },
  {
    code: 4012,
    cnMsg: "The operation is too frequent. Please try again later"
  },
  {
    code: 4013,
    cnMsg: "Operation timeout"
  },
  {
    code: 4014,
    cnMsg: "The length should be 8 to 20,and not all number"
  }
];
export default _temp;

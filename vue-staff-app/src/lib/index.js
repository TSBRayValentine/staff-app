import axios from "axios";
import { ToastProgrammatic as Toast } from 'buefy'

axios.defaults.withCredentials = true;
let API_URL

if (process.env.NODE_ENV === 'production') {
  API_URL = 'http://localhost:5000/api/'
} else {
   API_URL = 'http://localhost:5000/api/'
}

export default {
 
  API_URL,

  axios() {
    return axios.create({ validateStatus: function (status) { return status < 500; } })
  },

  toast(message, type = 'warning', duration = 3000) {
    if (message)
      Toast.open({
        duration: duration,
        message: message,
        type: "is-" + type,
      });
  },

  normalizeDate(d) {

    let ret;
    if (d) {
      let new_d = d;
      if (typeof (d) === 'string') {
        new_d = new Date(d);
      }
      ret = new Date(new_d.getFullYear(), new_d.getMonth(), new_d.getDate());
    }
    return ret;
  },

  calcValue(f, d) {
    let ret = "";
    if (f && typeof f === "number") {
      ret = f;
      if (d && typeof d === "number") {
        ret = f - d;
      }
    }
    // console.log("==> ret: " + ret);
    return ret;
  },

  randomNumber(min, max) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  },

  log(msg, exec_path = "", force = false) {
    if (localStorage.getItem('log') === "true" || force) {
      if (exec_path !== "")
        console.log('==== ' + exec_path + ' ====');
      console.log(msg);
    }
  },

  enableLogging() {
    localStorage.setItem("log", true);
  },

  disableLogging() {
    if (localStorage.getItem('log') !== null) {
      localStorage.setItem("log", false);
    }
  },

  getLoggingStatus() {
    let res = false;
    if (localStorage.getItem('log') !== null) {
      res = (localStorage.getItem('log') === "true") ? true : false;
    }
    else {
      localStorage.setItem("log", false);
    }
    this.log(res, "lib/index.js", true)
    return res;
  },

  getLoggedInStatus() {
    let res = false;
    if (localStorage.getItem('jwt') !== null) {
      res = (localStorage.getItem('jwt') === "1") ? true : false;
    }
    else {
      localStorage.removeItem("jwt");
    }
    // this.log(res, "lib/index.js")
    return res;
  },


  cleanStorageData() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("org");
  },

  getReportDate(d) {
    let retDate = new Date(d);
    let ret;
    ret =
      retDate.getFullYear() +
      "-" +
      ("0" + (retDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + retDate.getDate()).slice(-2);
    return ret;
  },

  getReportDateNew(d) {
    let retDate = new Date(d);
    let ret;
    ret =
    ("0" + retDate.getDate()).slice(-2) +
    "-" +
    ("0" + (retDate.getMonth() + 1)).slice(-2) +
    "-" +
      retDate.getFullYear() 
    return ret;
  },

}


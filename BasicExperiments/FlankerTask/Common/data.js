import { Scheduler } from "../lib/util-2020.1.js";
import { mean } from "./utils.js";

export class Data {
  constructor(expName, dirName) {
    this.expName = expName;
    this.dirName = dirName;
    this.vpNum = this.genVpNum();
    this.randomString = this.generateRandomString();
    this.datFileName = this.setFileName();
    this.data = [];
    this.ctrl = 0;
    this.cblk = 0;
  }

  genVpNum() {
    let num = new Date();
    return num.getTime();
  }

  setFileName() {
    return this.dirName + "/data/" + this.expName + "_" + this.vpNum;
  }

  initData(nblks, ntrls) {
    this.data = [];
    for (let blk = 0; blk < nblks; blk++) {
      this.data.push([]);
      for (let trl = 0; trl < ntrls; trl++) {
        this.data[blk].push({ blk: blk + 1, trl: trl + 1 });
      }
    }
  }

  addData(dat) {
    for (let blk = 0; blk < this.data.length; blk++) {
      for (let trl = 0; trl < this.data[blk].length; trl++) {
        for (let key in dat) {
          this.data[blk][trl][key] = dat[key];
        }
      }
    }
  }

  addDataBlk(blk, dat) {
    for (let trl = 0; trl < this.data[blk].length; trl++) {
      for (let key in dat) {
        this.data[blk][trl][key] = dat[key];
      }
    }
  }

  addDataBlkTrl(blk, trl, dat) {
    for (let key in dat) {
      this.data[blk][trl][key] = dat[key];
    }
  }

  calculateMeanBlkRt(blk, rtkey = "rt") {
    let rts = [];
    let rt;
    for (let i in this.data[blk]) {
      rt = this.data[blk][i][rtkey];
      if (rt !== undefined) {
        rts.push(rt);
      }
    }
    return Math.round(mean(rts) * 1000);
  }

  calculateMeanBlkErr(blk, errkey = "corrCode", corrVal = 1) {
    let dat = this.getDataBlk(blk, false);
    let nerr = 0;
    let err;
    for (let i in this.data[blk]) {
      err = this.data[blk][i][errkey];
      if (err !== undefined && err !== corrVal) {
        nerr++;
      }
    }
    return (nerr / dat.length) * 100;
  }

  getData(display = false) {
    if (display) {
      console.log(this.data);
    }
    return this.data;
  }

  getDataBlk(blk, display = false) {
    if (display) {
      console.log(this.data[blk]);
    }
    return this.data[blk];
  }

  getDataBlkTrl(blk, trl, display = false) {
    if (display) {
      console.log(this.data[blk][trl]);
    }
    return this.data[blk][trl];
  }

  saveData() {
    let dictcsv = this._JSON2CSV(this.data);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../Common/write_data.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ filename: this.datFileName, filedata: dictcsv }));
  }

  saveRandomCode(url) {
    $.ajax({
      type: "post",
      cache: false,
      url: url,
      data: { filename: this.datFileName, filedata: this.randomString },
    });
  }

  generateRandomString(length = 16) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = length; i > 0; --i) randomString += chars[Math.round(Math.random() * (chars.length - 1))];
    return randomString;
  }

  // adapted from jsPsych
  _JSON2CSV(objArray) {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    array = [].concat.apply([], array);
    let line = "";
    let result = "";
    let columns = [];

    let i = 0;
    for (let j = 0; j < array.length; j++) {
      for (let key in array[j]) {
        let keyString = key + "";
        keyString = '"' + keyString.replace(/"/g, '""') + '",';
        if (!columns.includes(key)) {
          columns[i] = key;
          line += keyString;
          i++;
        }
      }
    }

    line = line.slice(0, -1);
    result += line + "\r\n";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let j = 0; j < columns.length; j++) {
        let value = typeof array[i][columns[j]] === "undefined" ? "" : array[i][columns[j]];
        let valueString = value + "";
        line += '"' + valueString.replace(/"/g, '""') + '",';
      }

      line = line.slice(0, -1);
      result += line + "\r\n";
    }

    return result;
  }
}

export function saveData(data) {
  return function () {
    data.saveData();
    return Scheduler.Event.NEXT;
  };
}

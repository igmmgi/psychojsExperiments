import { Scheduler } from "../lib/util-2020.1.js";

export class Form {
  setup(form) {
    return function () {
      $("body").append(
        `<iframe id="iframe" src="${form}" style="border-style:none; overflow: hidden; width: 100%; height: 100%; position:absolute; left:40%; top:20%;"></iframe>`
      );
      return Scheduler.Event.NEXT;
    };
  }

  display(data) {
    return function () {
      while (!window.finishedHTML) {
        return Scheduler.Event.FLIP_REPEAT;
      }

      data.addData(window.form_data);
      $("#iframe").remove();
      return Scheduler.Event.NEXT;
    };
  }
}

import { Scheduler } from "../lib/util-2020.1.js";

export class Form {
  setup(form) {
    return function () {
      $("body").append(
        '<iframe id="iframe" src="' +
          form +
          '" frameborder = "0" scrolling="no" style="width: 15%; height: 50%; position:absolute; left:50%; top:30%;"></iframe>'
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

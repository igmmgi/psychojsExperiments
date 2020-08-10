import { Scheduler } from '../lib/util-2020.1.js';
import { PsychoJS } from '../lib/core-2020.1.js';
import { psychoJS } from '../Common/setup.js';
import * as core from '../lib/core-2020.1.js';
import * as util from '../lib/util-2020.1.js';

export const keyboard = new core.Keyboard({
  psychoJS: psychoJS,
  clock: new util.Clock(),
  waitForStart: true,
  status: PsychoJS.Status.NOT_STARTED,
});

export function waitKey(keyList = [], max_wait = Infinity, waitRelease = false) {
  return function () {
    let continueRoutine = true;

    // start keyboard
    if (keyboard.status === PsychoJS.Status.NOT_STARTED) {
      psychoJS.window.callOnFlip(function () {
        keyboard.clock.reset();
      });
      psychoJS.window.callOnFlip(function () {
        keyboard.clearEvents();
      });
      psychoJS.window.callOnFlip(function () {
        keyboard.start();
      }); // start on screen flip
    }

    let key = keyboard.getKeys({ keyList: keyList, waitRelease: waitRelease });
    if (key.length > 0) {
      keyboard.keyName = key[0].name;
      keyboard.rt = key[0].rt;
      continueRoutine = false;
    }

    // if trial started and max_duration < 1 frame interval -> trial ends
    if (keyboard.status === PsychoJS.Status.STARTED) {
      if (max_wait - keyboard.clock.getTime() < psychoJS.window.monitorFramePeriod) {
        continueRoutine = false;
      }
    }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      keyboard.stop();
      keyboard.clearEvents();
      keyboard.status = PsychoJS.Status.NOT_STARTED;
      return Scheduler.Event.NEXT;
    }
  };
}

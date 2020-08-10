import { Scheduler } from '../lib/util-2020.1.js';
import * as util from '../lib/util-2020.1.js';
import { psychoJS } from '../Common/setup.js';

export const expTimer = new util.Clock();
export const trlTimer = new util.Clock();

export function timeInterval(limit) {
  return function () {
    if (limit - trlTimer.getTime() < psychoJS.window.monitorFramePeriod) {
      return Scheduler.Event.NEXT;
    } else {
      return Scheduler.Event.FLIP_REPEAT;
    }
  };
}

export function resetTrlTimer() {
  return function () {
    trlTimer.reset();
    return Scheduler.Event.NEXT;
  };
}

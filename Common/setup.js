import { PsychoJS } from '../lib/core-2020.1.js';
import { Scheduler } from '../lib/util-2020.1.js';

// init psychoJS:
export const psychoJS = new PsychoJS({
  debug: false,
});

export const expScheduler = new Scheduler(psychoJS);
psychoJS.schedule(expScheduler);
psychoJS.start();

// Build dialog
let myDialog = psychoJS.gui.DlgFromDict({
  dictionary: { '': "Click 'OK' to start. Browser will enter full screen mode!" },
  title: 'Flanker Task',
});
psychoJS.schedule(myDialog());

export function startgui() {
  return function () {
    if (psychoJS.gui.dialogComponent.button !== 'OK') {
      return Scheduler.Event.FLIP_REPEAT;
    }
    return Scheduler.Event.NEXT;
  };
}

export function quitPsychoJS() {
  return function () {
    psychoJS._scheduler.stop();
  };
}

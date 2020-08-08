import { Scheduler } from "../lib/util-2020.1.js";

export function draw(components) {
  return function () {
    if (!Array.isArray(components)) {
      components = [components];
    }
    for (const component of components) {
      component.setAutoDraw(true);
    }
    return Scheduler.Event.NEXT;
  };
}

export function clear(components) {
  return function () {
    if (!Array.isArray(components)) {
      components = [components];
    }
    for (const component of components) {
      component.setAutoDraw(false);
    }
    return Scheduler.Event.NEXT;
  };
}

////////////////////////////////////////////////////////////////////////
//                      Basic Flanker Experiment                      //
////////////////////////////////////////////////////////////////////////
import { Scheduler } from './lib/util-2020.1.js';
import * as util from './lib/util-2020.1.js';
import * as visual from './lib/visual-2020.1.js';

import { Data, saveData } from './Common/data.js';
import { Form } from './Common/form.js';
import { psychoJS, startgui, expScheduler, quitPsychoJS } from './Common/setup.js';
import { shuffle, hideMouse } from './Common/utils.js';
import { keyboard, waitKey } from './Common/response.js';
import { timeInterval, resetTrlTimer } from './Common/timer.js';
import { draw, clear } from './Common/draw.js';

const prms = {
    nTrlsP: 4, // number of trials in first block (practice)
    nTrlsE: 8, // number of trials in subsequent blocks
    nBlks: 2,
    fixDur: 0.5,
    fbDur: 0.5,
    waitDur: 1,
    iti: 0.5,
    respKeys: ['x', 'm'],
    fbTxt: ['Correct', 'Error'],
};

// data
let data = new Data('FlankerTask', '/home/ian/Documents/JavaScript/psychojsExperiments/BasicExperiments/FlankerTask/');
data.initData(prms.nBlks, prms.nTrlsE);
data.addData({ vp: data.vpNum });

let form = new Form();

// open window:
psychoJS.openWindow({
    fullscr: true,
    color: new util.Color([0, 0, 0]),
    units: 'height',
    waitBlanking: true,
});

// psychoPy Visual Stimuli
const textWelcome = new visual.TextStim({
    win: psychoJS.window,
    name: 'textWelcome',
    text: 'Welcome. Press the spacebar to continue!',
    height: 0.05,
    wrapWidth: 1.5,
});

const textInstructions = new visual.TextStim({
    win: psychoJS.window,
    name: 'textInstructions',
    text:
        'Respond to the direction of the central arrow by pressing the ' +
        prms.respKeys[0] +
        ' (left) or ' +
        prms.respKeys[1] +
        ' (right) key.\n\nPress the spacebar to continue!',
    height: 0.05,
    wrapWidth: 1.5,
});

const fixationCross = new visual.ShapeStim({
    win: psychoJS.window,
    name: 'fixationCross',
    lineWidth: 1,
    fillColor: new util.Color('white'),
    vertices: 'cross',
    size: [0.025, 0.025],
});

const stimFlanker = new visual.TextStim({
    win: psychoJS.window,
    name: 'stimFlanker',
    height: 0.1,
});

const feedbackTxt = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedbackTxt',
    height: 0.05,
});

const blockTxt = new visual.TextStim({
    win: psychoJS.window,
    name: 'stimFlanker',
    height: 0.05,
});

const textEnd = new visual.TextStim({
    win: psychoJS.window,
    name: 'textEnd',
    text: 'End of experiment: Press the spacebar to continue then escape to exit full screen mode!',
    height: 0.05,
    wrapWidth: 1.5,
});

function setFlankerStim(text) {
    return function () {
        stimFlanker.text = text;
        return Scheduler.Event.NEXT;
    };
}

function codeTrial() {
<<<<<<< HEAD
  return function () {
    let dat = data.getDataBlkTrl(data.cblk, data.ctrl, false);
    let key = keyboard.keyName;
    let corrCode = key === dat.corrKey ? 1 : 2;
    feedbackTxt.text = prms.fbTxt[corrCode - 1];
    data.addDataBlkTrl(data.cblk, data.ctrl, {
      corrCode: corrCode,
      rt: keyboard.rt,
    });
    data.ctrl++;
    return Scheduler.Event.NEXT;
  };
}

function blockFeedbackText() {
  return function () {
    let blkRt = data.calculateMeanBlkRt(data.cblk, "rt");
    let blkErr = data.calculateMeanBlkErr(data.cblk, "corrCode", 1);
    blockTxt.text =
      "Block " + (data.cblk + 1) + " of " + prms.nBlks + "\n\n" +
      "Mean RT: " + blkRt + " ms\n\n" +
      "Error Rate: " + blkErr + " %\n\n\n" +
      "Press the spacebar to continue!";
    data.ctrl = 0;
    data.cblk++;
    return Scheduler.Event.NEXT;
  };
=======
    return function () {
        let dat = data.getDataBlkTrl(data.cblk, data.ctrl, false);
        let key = keyboard.keyName;
        let corrCode;
        if (key === dat.corrKey) {
            corrCode = 1;
            feedbackTxt.text = prms.fbTxt[0];
        } else {
            corrCode = 2;
            feedbackTxt.text = prms.fbTxt[1];
        }
        data.addDataBlkTrl(data.cblk, data.ctrl, { corrCode: corrCode, rt: keyboard.rt });
        data.ctrl++;
        return Scheduler.Event.NEXT;
    };
}

function blockFeedbackText() {
    return function () {
        let blkRt = data.calculateMeanBlkRt(data.cblk, 'rt');
        let blkErr = data.calculateMeanBlkErr(data.cblk, 'corrCode', 1);
        blockTxt.text =
            'Block ' +
            (data.cblk + 1) +
            ' of ' +
            prms.nBlks +
            '\n\nMean RT: ' +
            blkRt +
            ' ms\n\nError Rate: ' +
            blkErr +
            ' %' +
            '\n\n\nPress the spacebar to continue!';
        data.ctrl = 0;
        data.cblk++;
        return Scheduler.Event.NEXT;
    };
>>>>>>> bb7b8e027e2d47116cd7f76b4e5a744b82a6db3b
}

function singleFlankerTrial(text) {
    // fixation cross
    expScheduler.add(draw(fixationCross));
    expScheduler.add(resetTrlTimer());
    expScheduler.add(timeInterval(prms.fixDur));
    expScheduler.add(clear(fixationCross));

    // flanker stimmulus until key response
    expScheduler.add(setFlankerStim(text));
    expScheduler.add(draw(stimFlanker));
    expScheduler.add(waitKey());
    expScheduler.add(codeTrial());
    expScheduler.add(clear(stimFlanker));

    // feedback text
    expScheduler.add(draw(feedbackTxt));
    expScheduler.add(resetTrlTimer());
    expScheduler.add(timeInterval(prms.fbDur));
    expScheduler.add(clear(feedbackTxt));

    // inter-trial-interval
    expScheduler.add(resetTrlTimer());
    expScheduler.add(timeInterval(prms.iti));
}

function presentBlockText() {
    expScheduler.add(blockFeedbackText()); // calculate previous block performance
    expScheduler.add(draw(blockTxt));
    expScheduler.add(waitKey());
    expScheduler.add(clear(blockTxt));
    expScheduler.add(resetTrlTimer());
    expScheduler.add(timeInterval(prms.waitDur));
}

let conditions = [
    { text: '<<<<<', comp: 'comp', respDir: 'left', corrKey: prms.respKeys[0] },
    { text: '>>>>>', comp: 'comp', respDir: 'right', corrKey: prms.respKeys[1] },
    { text: '<<><<', comp: 'incomp', respDir: 'right', corrKey: prms.respKeys[1] },
    { text: '>><>>', comp: 'incomp', respDir: 'left', corrKey: prms.respKeys[0] },
];

// Create Experiment Sequence
expScheduler.add(startgui());

// Participant information
expScheduler.add(form.setup('forms/vp_info_basic.html'));
expScheduler.add(form.display(data));

// Welcome Screen
expScheduler.add(hideMouse(true));
expScheduler.add(draw(textWelcome));
expScheduler.add(waitKey(['space']));
expScheduler.add(clear(textWelcome));
expScheduler.add(resetTrlTimer());
expScheduler.add(timeInterval(prms.waitDur));

// Instructions
expScheduler.add(draw(textInstructions));
expScheduler.add(waitKey(['space']));
expScheduler.add(clear(textInstructions));
expScheduler.add(resetTrlTimer());
expScheduler.add(timeInterval(prms.waitDur));
    
// Blocks of flanker stimuli separated by break with performance feedback
for (let blk = 0; blk < prms.nBlks; blk++) {
    let reps = blk === 0 ? prms.nTrlsP / conditions.length : prms.nTrlsE / conditions.length;
    let blk_conditions = shuffle(new Array(reps).fill(conditions).flat());
    for (let trl = 0; trl < blk_conditions.length; trl++) {
        singleFlankerTrial(blk_conditions[trl].text);
        data.addDataBlkTrl(blk, trl, blk_conditions[trl]);
    }
    presentBlockText();
}

// Save Data
expScheduler.add(saveData(data));

// End Screen
expScheduler.add(draw(textEnd));
expScheduler.add(waitKey(['space']));
expScheduler.add(clear(textEnd));
expScheduler.add(hideMouse(false));

expScheduler.add(quitPsychoJS());

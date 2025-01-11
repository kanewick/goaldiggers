const LCB = { left: 15, top: 25 };
const CB = { left: 45, top: 25 };
const RCB = { right: 15, top: 25 };

const LCM = { left: 15, top: 52 };
const RCM = { right: 15, top: 52 };
const CM = { left: 45, top: 52 };
const CDM = { left: 45, top: 32 };
const CAM = { left: 45, top: 60 };

const CF = { left: 45, top: 82 };
const LF = { left: 15, top: 82 };
const RF = { right: 15, top: 82 };

const FormationMaps = {
  "2-2-1": {
    LCB: LCB,
    RCB: RCB,
    LCM: LCM,
    RCM: RCM,
    CF: CF,
  },
  "2-1-2": {
    LCB: LCB,
    RCB: RCB,
    CM: CM,
    LF: LF,
    RF: RF,
  },
  "1-3-1": {
    CB: CB,
    LCM: LCM,
    CM: CM,
    RCM: RCM,
    CF: CF,
  },
  "3-1-1": {
    LCB: LCB,
    CB: CB,
    RCB: RCB,
    CM: CM,
    CF: CF,
  },
  "1-2-2": {
    CB: CB,
    LCM: LCM,
    RCM: RCM,
    LF: LF,
    RF: RF,
  },
  "2-3": {
    LCB: LCB,
    RCB: RCB,
    LCM: LCM,
    CM: CM,
    RCM: RCM,
  },
  "2-1-1-1": {
    LCB: LCB,
    RCB: RCB,
    CDM: CDM,
    CAM: CAM,
    CF: CF,
  },
  "1-2-1-1": {
    CB: CB,
    LCM: LCM,
    RCM: RCM,
    CAM: CAM,
    CF: CF,
  },
  "2-2-2": {
    LCB,
    RCB,
    LCM,
    RCM,
    LF,
    RF,
  },
};

export default FormationMaps;

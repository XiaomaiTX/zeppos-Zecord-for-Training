import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";

export const SWITCH_BUTTON = {
    x: (px(480)-64)/2,
    y: px(370),
    text: "",
    w: -1,
    h: -1,
    normal_src: 'switch.png',
    press_src: 'switch_press.png',
};

export const RECORD_BUTTON = {
    x: px(480-150)/2,
    y: px(480-150)/2,
    text: "",
    w: -1,
    h: -1,
    normal_src: 'record.png',
    press_src: 'record_press.png',
};
export const TITLE = {
    x: px(0),
    y: px(64),
    w: px(480),
    h: 46,
    color: 0xffffff,
    text_size: 36,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "每日打卡",
};
export const RECORD_VIEWER = {
    x: px(0),
    y: px(480-230)/2,
    w: px(480),
    h: px(230),
    color: 0xffffff,
    text_size: 36,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
};

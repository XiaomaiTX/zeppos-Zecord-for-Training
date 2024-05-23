import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";

export const SWITCH_BUTTON = {
    x: (px(480)-64)/2,
    y: px(380),
    text: "",
    w: 64,
    h: 64,
    radius: 32,
    normal_color: 0xfc6950,
    press_color: 0xfeb4a8,
};

export const RECORD_BUTTON = {
    x: px(480-100)/2,
    y: px(480-100)/2,
    text: "",
    w: px(100),
    h: px(100),
    radius: px(50),
    normal_color: 0xfc6950,
    press_color: 0xfeb4a8,
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

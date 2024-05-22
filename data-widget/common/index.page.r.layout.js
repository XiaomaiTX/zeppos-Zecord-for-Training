import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";

export const CALORIES_PROGRESS = {
    x: 0,
    y: 0,
    w: px(480),
    h: px(480),
    start_angle: -90,
    end_angle: 90,
    color: 0xfc6950,
    line_width: 20,
};

export const GOAL_DAYS = {
    x: 0,
    y: 120,
    w: 480,
    h: 46,
    color: 0xffffff,
    text_size: 36,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "达成目标 X 天",
};

export const TODAY_STATUS = {
    x: px(480) - 64,
    y: px(480) - 64,
    src: "Finish.png",
};
import * as hmUI from "@zos/ui";
import * as STYLE from "zosLoader:./index.page.[pf].layout.js";
import { getSportData } from "@zos/app-access";
import { Time } from "@zos/sensor";
import { EasyFlashStorage } from "@silver-zepp/easy-storage";
import { getText } from '@zos/i18n'

const flash = new EasyFlashStorage("zecord_for_training");
const date = new Date();
const dateStr = date.getFullYear() + date.getMonth() + date.getDate();

/*



*/

const pages = ["record", "7days", "14days", "28days"];

DataWidget({
    init() {
        // 清理30days以前的记录
        const oldKeys = flash.getAllKeys();
        for (let i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] < dateStr) {
                flash.removeKey(oldKeys[i]);
            }
        }
    },
    build() {
        this.init();
        const title = hmUI.createWidget(hmUI.widget.TEXT, STYLE.TITLE);
        const switch_button = hmUI.createWidget(hmUI.widget.BUTTON, {
            ...STYLE.SWITCH_BUTTON,
            click_func: () => {
                console.log("button click");
                // 跳转至下一页面
                const index = pages.indexOf(pageStatus);
                if (index < pages.length - 1) {
                    pageStatus = pages[index + 1];
                } else {
                    pageStatus = pages[0];
                }
                gotoPage(pageStatus);
            },
        });
        const record_button = hmUI.createWidget(
            hmUI.widget.BUTTON,
            STYLE.RECORD_BUTTON
        );
        record_button.setProperty(hmUI.prop.VISIBLE, true);
        const record_viewer = hmUI.createWidget(
            hmUI.widget.TEXT,
            STYLE.RECORD_VIEWER
        );
        record_viewer.setProperty(hmUI.prop.VISIBLE, false);

        gotoPage("record");

        function gotoPage(page) {
            switch (page) {
                case "record":
                    record();
                    break;
                case "7days":
                    history(7);
                    break;
                case "14days":
                    history(14);
                    break;
                case "28days":
                    history(28);
                    break;
                default:
                    break;
            }
        }
        function record() {
            record_viewer.setProperty(hmUI.prop.VISIBLE, false);
            record_button.setProperty(hmUI.prop.VISIBLE, true);
            if (flash.hasKey(dateStr)) {
                title.setProperty(hmUI.prop.MORE, {
                    text: getText("recorded"),
                });
            } else {
                title.setProperty(hmUI.prop.MORE, {
                    text: getText("non_recorded"),
                });
                record_button.setProperty(hmUI.prop.MORE, {
                    ...STYLE.RECORD_BUTTON,
                    click_func: () => {
                        if (flash.hasKey(dateStr)) {
                        } else {
                            flash.setKey(dateStr, 1);
                            title.setProperty(hmUI.prop.MORE, {
                                text: getText("record_success"),
                            });
                        }
                    },
                });
    
            }

        }
        function history(day) {
            record_button.setProperty(hmUI.prop.VISIBLE, false);
            record_viewer.setProperty(hmUI.prop.VISIBLE, true);
            title.setProperty(hmUI.prop.MORE, {
                text: `${day} ${getText("days record")}`,
            });
            record_viewer.setProperty(hmUI.prop.TEXT, getRecordText(day));
        }
        function getRecordText(day) {
            let keys = flash.getAllKeys();
            console.log(keys);
            /*
            
            */
            recordData = [];
            for (let i = 0; i < keys.length; i++) {
                recordData.push(flash.getKey(keys[i]));
            }
            if (keys.length < day) {
                // 视作0在前面补全
                for (let i = 0; i < day - keys.length; i++) {
                    recordData.unshift(0);
                }
            }
            console.log(recordData);
            let recordText = "";
            for (let i = 0; i < recordData.length; i++) {
                if (recordData[i] == 1) {
                    recordText += "●";
                } else {
                    recordText += "○";
                }
            }
            // 每7个为一行，添加换行符
            recordText = recordText.replace(/(.{7})/g, "$1\n");
            return recordText;
        }
    },
    onInit() {},

    onDestroy() {},
});

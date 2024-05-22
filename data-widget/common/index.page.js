import * as hmUI from "@zos/ui";
import * as STYLE from "zosLoader:./index.page.[pf].layout.js";
import { getSportData } from "@zos/app-access";
import { Time } from "@zos/sensor";
import { EasyFlashStorage } from "@silver-zepp/easy-storage";

const flash = new EasyFlashStorage("zecord_for_training");
const date = new Date();
const dateStr = date.getFullYear() + date.getMonth() + date.getDate();

/*

TODO:
- 检测卡路里到达标准即打卡成功
- 持久化存储
- 显示打卡天数

*/
const CALORIRS_GOAL = 1000;

DataWidget({
    init() {},
    build() {
        this.init();
        const CaloriesProgress = hmUI.createWidget(
            hmUI.widget.ARC,
            STYLE.CALORIES_PROGRESS
        );
        const GoalDaysViewer = hmUI.createWidget(
            hmUI.widget.TEXT,
            STYLE.GOAL_DAYS
        );
        // const TodayStatus = hmUI.createWidget(
        //     hmUI.widget.IMG,
        //     STYLE.TODAY_STATUS
        // );
        main();
        function fetchCalories() {
          console.log("fetchCalories");
            // const result = getSportData(
            //     {
            //         type: "calories",
            //     },
            //     (callbackResult) => {
            //         const { code, data } = callbackResult;
            //         if (code === 0) {
            //             const { calories } = data;
            //             console.log(calories);
            //         }
            //     }
            // );

            return hmUI.sport_data.CONSUME;
        }
        function initFlash() {
            if (flash.hasKey("isInit") == false) {
                flash.setKey("isInit", true);
                flash.setKey("goal_days", 0);
            }
        }
        function main() {
            initFlash();
            console.log("main");
            // 检测今天是否已经完成目标
            if (true) {//flash.hasKey(dateStr) == false
                const cal = fetchCalories();
                console.log('cal ' + cal);
                switch (true) {
                    case cal>=0 && cal < CALORIRS_GOAL:
                      console.log("未达标");
                        const calProgressVal = -90 + (cal / CALORIRS_GOAL) * 360;
                        console.log(calProgressVal);
                        GoalDaysViewer.setProperty(hmUI.prop.MORE, {
                            text: cal,
                        });
                        CaloriesProgress.setProperty(hmUI.prop.MORE, {
                          end_angle: calProgressVal,
                      });
      
                        break;

                    case cal >= CALORIRS_GOAL:
                      console.log("达标");
                        // 触发打卡成功事件
                        CaloriesProgress.setProperty(hmUI.prop.MORE, {
                          end_angle: 270,
                      });

                        finishGoal();
                    default:
                        console.log("d");
                        break;
                }
            } else {
              console.log("已完成");
                // 今天已经完成目标
                CaloriesProgress.setProperty(hmUI.prop.MORE, {
                    end_angle: 270,
                });
                GoalDaysViewer.setProperty(hmUI.prop.MORE, {
                    text: `达成目标 ${flash.getKey("goal_days")} 天`,
                });
            }
        }
        function finishGoal() {
            // 打卡成功
            // TODO: 打卡成功后持久化存储
            flash.setKey("goal_days", flash.getKey("goal_days") + 1);
            flash.setKey(dateStr, true);
            GoalDaysViewer.setProperty(hmUI.prop.MORE, {
                text: `达成目标 ${flash.getKey("goal_days")} 天`,
            });
        }
    },
    onInit() {},

    onDestroy() {},
});

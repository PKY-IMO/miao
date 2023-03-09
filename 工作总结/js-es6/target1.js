@shortcut()
export class DemoButton extends Widget {
    static xtype = "demo.button";

    props = {
        baseCls: "demo-button",
    };

    render() {
        var items = [{
            type: "bi.button",
            text: "一般按钮1111111111111",
            level: "common",
            whiteSpace: "nowrap",
            width: 100,
            height: 30,
            handler() {
                console.log("触发点击事件");
                this.loading();
                setTimeout(() => {
                    this.loaded();
                }, 5 * 1000);
            },
        }, {
            type: "bi.button",
            text: "表示成功状态按钮",
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示警告状态的按钮",
            level: "warning",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示错误状态的按钮",
            level: "error",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示忽略状态的按钮",
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "普通灰化按钮",
            disabled: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "忽略状态灰化按钮",
            disabled: true,
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "带图标的按钮",
            // level: 'ignore',
            iconCls: "close-font",
            height: 30,
        }, {
            type: "bi.button",
            text: "一般按钮",
            block: true,
            level: "common",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示成功状态按钮",
            block: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示警告状态的按钮",
            block: true,
            level: "warning",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示忽略状态的按钮",
            block: true,
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "普通灰化按钮",
            block: true,
            disabled: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "忽略状态灰化按钮",
            block: true,
            disabled: true,
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "带图标的按钮",
            block: true,
            // level: 'ignore',
            iconCls: "close-font",
            height: 30,
        }, {
            type: "bi.button",
            text: "一般按钮",
            clear: true,
            level: "common",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示成功状态按钮",
            clear: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示警告状态的按钮",
            clear: true,
            level: "warning",
            height: 30,
        }, {
            type: "bi.button",
            text: "表示忽略状态的按钮",
            clear: true,
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "普通灰化按钮",
            clear: true,
            disabled: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "忽略状态灰化按钮",
            clear: true,
            disabled: true,
            level: "ignore",
            height: 30,
        }, {
            type: "bi.button",
            text: "带图标的按钮",
            clear: true,
            // level: 'ignore',
            iconCls: "close-font",
            height: 30,
        }, {
            type: "bi.text_button",
            text: "文字按钮",
            height: 30,
        }, {
            type: "bi.button",
            text: "幽灵按钮（common）",
            ghost: true,
            height: 30,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "幽灵按钮（common）",
            ghost: true,
            height: 30,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "幽灵按钮（common）",
            ghost: true,
            level: "warning",
            height: 30,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "幽灵按钮（common）",
            ghost: true,
            level: "error",
            height: 30,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "幽灵按钮（common）",
            ghost: true,
            level: "success",
            height: 30,
        }, {
            type: "bi.button",
            text: "幽灵按钮（common）灰化",
            disabled: true,
            ghost: true,
            height: 30,
        }, {
            type: "bi.button",
            text: "弹出bubble",
            bubble: function () {
                return BI.parseInt(Math.random() * 100) % 10 + "提示";
            },
            handler: function () {
                BI.Msg.toast("1111");
            },
            height: 30,
        }, {
            type: "bi.button",
            text: "自动撑开",
            iconCls: "close-font",
            // textHeight: 32,
            // height: 32,
            iconGap: 64,
            vgap: 16,
            hgap: 100,
            iconPosition: "bottom",
        }, {
            type: "bi.button",
            text: "图标在下面的按钮",
            iconCls: "close-font",
            iconPosition: "bottom",
        }, {
            type: "bi.button",
            text: "图标在左边的按钮",
            iconCls: "close-font",
            iconPosition: "left",
        }, {
            type: "bi.button",
            text: "图标在右边的按钮",
            iconCls: "close-font",
            iconPosition: "right",
        }, {
            type: "bi.button",
            text: "浅色的一般按钮",
            iconCls: "plus-font",
            light: true,
        }, {
            type: "bi.button",
            text: "浅色的成功按钮",
            level: "success",
            iconCls: "plus-font",
            light: true,
        }, {
            type: "bi.button",
            text: "浅色的警告按钮",
            level: "warning",
            iconCls: "plus-font",
            light: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "浅色的失败按钮",
            level: "error",
            cls: "hover-mask",
            light: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            level: "common",
            plain: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            level: "success",
            plain: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            level: "error",
            plain: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            level: "warning",
            plain: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            level: "ignore",
            plain: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            plain: true,
            level: "error",
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "朴素的按钮",
            plain: true,
            disabled: true,
        }, {
            type: "bi.button",
            iconCls: "plus-font",
            text: "点我，更改图标",
            handler() {
                this.i = this.i === undefined ? 0 : ++this.i;
                const arr = ["text-background-font", "check-mark-ha-font", "close-font", "search-font", "date-change-h-font"];
                if (this.i >= arr.length) {
                    this.i = 0;
                }
                this.setIcon(arr[this.i]);
            },
            height: 24,
        }, {
            type: "bi.button",
            text: "带加载的按钮",
            handler() {
                console.log("触发点击事件");
                this.loading();
                setTimeout(() => {
                    this.loaded();
                }, 5 * 1000);
            },
        }, {
            type: "bi.button",
            text: "带加载的按钮",
            iconCls: "circle-close-font",
            handler() {
                console.log("触发点击事件");
                this.loading();
                setTimeout(() => {
                    this.loaded();
                }, 5 * 1000);
            },
        }, {
            type: "bi.button",
            clear: true,
            text: "带加载的按钮",
            iconCls: "circle-close-font",
            handler() {
                console.log("触发点击事件");
                this.loading();
                setTimeout(() => {
                    this.loaded();
                }, 5 * 1000);
            },
        }, {
            type: "bi.button",
            text: "加载中的按钮",
            loading: true,
            handler() {
                console.log("我是无法被触发的!");
            },
        }, {
            type: "bi.button",
            text: "自定义图标按钮（点我修改）",
            icon: {
                type: "demo.joker.icon",
            },
            handler() {
                console.log("触发点击事件");
                this.loading();
                setTimeout(() => {
                    this.loaded();
                }, 5 * 1000);
            },
        }, {
            type: "bi.button",
            text: "文字偏左的按钮",
            textAlign: "left",
            width: 200,
        }, {
            type: "bi.button",
            text: "小于最小宽度的按钮",
            width: 50,
        }, {
            type: "bi.button",
            text: "一个文字超级超级长的 button, 他比按钮宽度还长。",
            textWidth: 500,
            width: 100,
        }];

        return {
            type: "bi.left",
            scrolly: true,
            vgap: 100,
            hgap: 20,
            items: BI.map(items, function (index, value) {
                return {
                    el: value,
                };
            }),
        };
    }
}
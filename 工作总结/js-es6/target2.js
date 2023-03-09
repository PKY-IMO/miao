@shortcut()
export class DemoJokerIcon extends Widget {
    static xtype = "demo.joker.icon";

    render() {
        var self = this;

        return {
            type: "bi.label",
            cls: "anim-rotate",
            ref: function(ref) {
                self.text = ref;
            },
        };
    }

    loading() {
        this.text.setText("🤡");
    }
    loaded() {
        this.text.setText("");
    }
}
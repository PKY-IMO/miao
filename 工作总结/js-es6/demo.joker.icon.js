BI.JokerIcon = BI.inherit(BI.Widget, {
        render: function () {
            var self = this;

            return {
                type: "bi.label",
                cls: "anim-rotate",
                ref: function(ref) {
                    self.text = ref;
                },
            };
        },
        loading: function () {
            this.text.setText("🤡");
        },
        loaded: function () {
            this.text.setText("");
        },
    });
    BI.shortcut("demo.joker.icon", BI.JokerIcon);
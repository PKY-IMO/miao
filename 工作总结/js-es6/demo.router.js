Demo.Router = BI.inherit(BI.Widget, {
    props: {
        baseCls: "demo-router"
    },
    render: function () {
        var self = this;
        var params = BI.Router.$router.history.current.params;
        return {
            type: params.componentId
        }
    }
});
BI.shortcut("demo.router", Demo.Router);
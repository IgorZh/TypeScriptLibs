var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="jquery.d.ts" />
/// <reference path="backbone.d.ts" />
/// <reference path="underscore.d.ts" />
var Paging;
(function (Paging) {
    var PagingModel = (function (_super) {
        __extends(PagingModel, _super);
        function PagingModel() {
            _super.apply(this, arguments);
            this.defaults = {
                isAjax: false
            };
        }
        return PagingModel;
    })(Backbone.Model);

    var PagingView = (function (_super) {
        __extends(PagingView, _super);
        function PagingView() {
            _super.apply(this, arguments);
            this.template = _.template($('#paging').html());
        }
        return PagingView;
    })(Backbone.View);
})(Paging || (Paging = {}));

var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();

window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map

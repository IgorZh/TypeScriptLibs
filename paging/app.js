/// <reference path="jquery.d.ts" />
/// <reference path="backbone.d.ts" />
/// <reference path="underscore.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Paging;
(function (Paging) {
    var PagingModel = (function (_super) {
        __extends(PagingModel, _super);
        function PagingModel() {
            _super.apply(this, arguments);
        }
        PagingModel.prototype.defaults = function () {
            return {
                pageCount: 14,
                pageShown: 5,
                activePage: 1
            };
        };

        PagingModel.prototype.validate = function (attributes, options) {
            if (attributes.activePage > attributes.pageCount || attributes.activePage < 1)
                return "Invalid page";
        };

        PagingModel.prototype.isStart = function () {
            return this.get('activePage') === 1;
        };

        PagingModel.prototype.isEnd = function () {
            return this.get('activePage') === this.get('pageCount');
        };

        PagingModel.prototype.startPage = function () {
            return 1 + ~~((this.get('activePage') - 1) / this.get('pageShown')) * this.get('pageShown');
        };

        PagingModel.prototype.endPage = function () {
            var p = this.startPage() + this.get('pageShown') - 1, pCount = this.get('pageCount');
            return p > pCount ? pCount : p;
        };

        PagingModel.prototype.toJSON = function () {
            var res = _(this.attributes).clone();

            res.isStart = this.isStart();
            res.isEnd = this.isEnd();
            res.startPage = this.startPage();
            res.endPage = this.endPage();

            return res;
        };
        return PagingModel;
    })(Backbone.Model);
    Paging.PagingModel = PagingModel;

    var PagingView = (function (_super) {
        __extends(PagingView, _super);
        function PagingView() {
            _super.apply(this, arguments);
        }
        PagingView.prototype.events = function () {
            return {
                'click a': 'onClick'
            };
        };

        PagingView.prototype.initialize = function () {
            this.listenTo(this.model, 'change:activePage', this.render);
        };

        PagingView.prototype.render = function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        };

        PagingView.prototype.onClick = function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.model.set({ activePage: $(e.currentTarget).data('page') }, { validate: true });
        };
        return PagingView;
    })(Backbone.View);
    Paging.PagingView = PagingView;

    PagingView.prototype.template = _.template($('#paging-template').html());
})(Paging || (Paging = {}));

var m = new Paging.PagingModel();
var v = new Paging.PagingView({ el: "#content", model: m });
v.render();
//# sourceMappingURL=app.js.map

/// <reference path="jquery.d.ts" />
/// <reference path="backbone.d.ts" />
/// <reference path="underscore.d.ts" />

module Paging {
    export class PagingModel extends Backbone.Model {
        defaults() {
            return {
                pageCount: 14,
                pageShown: 5,
                activePage: 1
            };
        }

        validate(attributes: any, options?: any ) {
            if (attributes.activePage > attributes.pageCount || attributes.activePage < 1)
                return "Invalid page";
        }


        isStart() {
            return this.get('activePage') === 1;
        }

        isEnd() {
            return this.get('activePage') === this.get('pageCount');
        }

        startPage() {
            return 1 + ~~((this.get('activePage') - 1) / this.get('pageShown')) * this.get('pageShown');
        }

        endPage() {
            var p: number = this.startPage() + this.get('pageShown') - 1,
                pCount: number = this.get('pageCount'); 
            return p > pCount ? pCount : p;
        }

        toJSON() {
            var res = _(this.attributes).clone();

            res.isStart = this.isStart();
            res.isEnd = this.isEnd();
            res.startPage = this.startPage();
            res.endPage = this.endPage();

            return res;
        }
    }

    export class PagingView extends Backbone.View {
        template: (data: any) => string;

        events() {
            return {
                'click a': 'onClick'
            };
        }

        initialize() {
            this.listenTo(this.model, 'change:activePage', this.render);
        }

        render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

        onClick(e: Event) {
            e.stopPropagation();
            e.preventDefault();
            this.model.set({ activePage: $(e.currentTarget).data('page') }, {validate: true});
        }
    }

    PagingView.prototype.template = _.template($('#paging-template').html());
}

var m = new Paging.PagingModel();
var v = new Paging.PagingView({ el: "#content", model: m });
v.render();
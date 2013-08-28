/// <reference path="jquery.d.ts" />
/// <reference path="backbone.d.ts" />
/// <reference path="underscore.d.ts" />
module Paging {
    class PagingModel extends Backbone.Model {

        defaults {
            isAjax: false
        }
    }

    class PagingView extends Backbone.View {
        template = _.template($('#paging').html())
    }
}


class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
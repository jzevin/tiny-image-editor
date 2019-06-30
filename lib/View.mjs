
let $, $$;
class View {
    app;
    dom;
    constructor(app, el) {
        this.app = app;
        $ = el.querySelector.bind(el);
        $$ = el.querySelectorAll.bind(el);
        this.dom = {
            el,
            panelsEl: $('#panels'),
            documentsEl: $('#documents'),
            buttons: {
                newLayer: $('.btn--add-layer')
            }
        }
    }
}

export {
    View
};
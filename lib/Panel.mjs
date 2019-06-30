class Panel {

    app;
    name;
    parentEl;
    panelHeaderEl;
    panelBodyEl;
    panelFooterEl;
    
    constructor(app, name, parentEl) {
        this.app = app;
        this.name = name;
        this.parentEl = parentEl;
        this.mount();
    }

    getHTML() {
        return `
            <div class="panel panel--${this.name.toLowerCase()}">
                <div class="panel-header">
                    <div class="label">${this.name}</div>
                </div>
                <div class="panel-body">
                </div>
                <div class="panel-footer"></div>
            </div>
        `;
    }

    mount() {
        this.parentEl.insertAdjacentHTML('afterbegin', this.getHTML());
        this.panelHeaderEl = this.parentEl.querySelector(`.panel--${this.name.toLowerCase()} .panel-header`);
        this.panelBodyEl = this.parentEl.querySelector(`.panel--${this.name.toLowerCase()} .panel-body`);
        this.panelFooterEl = this.parentEl.querySelector(`.panel--${this.name.toLowerCase()} .panel-footer`);
    }
};



export {
    Panel
};
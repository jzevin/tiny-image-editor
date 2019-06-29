let id = 0;

function getId() {
    return id++;
}

class Layer {
    constructor(w, h) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = getId();
        this.canvas.classList.add('layer');
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
    }
}

class CanvasDocument {
    app;
    el;
    w;
    h;
    layers = [];
    mousePos = {x: 0, y: 0};
    shouldDraw = false;
    constructor(app, container, w, h) {
        this.app = app;
        this.w = w;
        this.h = h;
        this.el = this.mount(container);
        this.app.subscribe('mousedown', e => this.onMouseDown(e));
        this.app.subscribe('mouseup', e => this.onMouseUp(e));
        this.app.subscribe('mousemove', e => this.onMouseMove(e));
    }
    mount (container) {
        // document element
        const el = document.createElement('div');
        el.classList.add('document', 'flex', 'jcc', 'aic', 'h-100');
        // new layer
        const layer = this.addLayer();
        // add canvas to el
        el.appendChild(layer.canvas);
        // add el to container and return el
        container.appendChild(el);
        return el;
    }
    addLayer() {
        const layer = new Layer(this.w, this.h);
        layer.ctx.font = '36px sans-serif';
        layer.ctx.fillStyle = `hsl( ${Math.random()*359}, 80%, 50%)`;
        layer.ctx.fillText(
            layer.canvas.id,
            Math.random() * this.w - 18,
            (Math.random() * this.h) + 18
        )
        this.layers.push(layer);
        return layer;
    }
    onMouseDown(e) {
        this.shouldDraw = true;
    }
    onMouseUp(e) {
        this.shouldDraw = false;
    }
    onMouseMove(e) {
        this.mousePos.x = e.clientX  - this.layers[0].canvas.offsetLeft;
        this.mousePos.y = e.clientY  - this.layers[0].canvas.offsetTop;
        console.log(this.mousePos);
        if(this.shouldDraw) {
            this.layers[0].ctx.fillRect(this.mousePos.x, this.mousePos.y, 4, 4);
        }
    }
}

export {
    CanvasDocument
};
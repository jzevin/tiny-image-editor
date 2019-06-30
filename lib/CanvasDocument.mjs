let id = 0;

function getId() {
    return id++;
}

class Layer {
    constructor(w, h) {
        this.id = getId();
        this.canvas = document.createElement('canvas');
        this.canvas.id = `canvas-${this.id}`;
        this.canvas.classList.add('layer');
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
    }
}

class CanvasDocument {
    app;
    el;
    layersEl;
    w;
    h;
    layers = [];
    mousePos = {x: 0, y: 0};
    shouldDraw = false;
    currentLayer;
    constructor(app, container, w, h) {
        this.app = app;
        this.w = w;
        this.h = h;
        this.mount(container);
        this.app.subscribe('mousedown', e => this.onMouseDown(e));
        this.app.subscribe('mouseup', e => this.onMouseUp(e));
        this.app.subscribe('mousemove', e => this.onMouseMove(e));
    }
    mount (container) {
        // document element
        this.el = document.createElement('div');
        this.el.classList.add('document', 'flex', 'jcc', 'aic', 'h-100');
        this.layersEl = document.createElement('div');
        this.layersEl.classList.add('layers');
        this.layersEl.style.width = `${this.w}px`;
        this.layersEl.style.height = `${this.h}px`;
        this.el.appendChild(this.layersEl);
        // new layer
        this.addLayer();
        // add el to container and return el
        container.appendChild(this.el);
    }
    addLayer() {
        const layer = new Layer(this.w, this.h);
        layer.ctx.font = '18px sans-serif';
        layer.ctx.fillStyle = `hsl( ${Math.random()*359}, 80%, 50%)`;
        layer.ctx.fillText(
            layer.canvas.id,
            Math.random() * this.w - 18,
            (Math.random() * this.h) + 18
        )
        this.layers.push(layer);
        this.setCurrentLayer(layer);
        // add canvas to el
        this.layersEl.appendChild(layer.canvas);
        return layer;
    }
    setCurrentLayer(layer) {
        this.currentLayer = layer;
    }
    setCurrentLayerByIndex(index) {
        this.currentLayer = this.layers[index];
    }
    onMouseDown(e) {
        this.shouldDraw = true;
    }
    onMouseUp(e) {
        this.shouldDraw = false;
    }
    onMouseMove(e) {
        this.mousePos.x = e.clientX  - this.layersEl.offsetLeft;
        this.mousePos.y = e.clientY  - this.layersEl.offsetTop;
        if(this.shouldDraw) {
            this.currentLayer.ctx.fillRect(this.mousePos.x, this.mousePos.y, 4, 4);
        }
    }
}

export {
    CanvasDocument
};
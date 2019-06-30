import { Panel } from "./Panel.mjs";

class LayersPanel extends Panel {

    addLayerBtn;
    
    constructor(app, name, parentEl) {
        super(app, name, parentEl);
        this.afterMount();
        this.app.subscribe('click', e => this.onClick(e));
    }

    afterMount() {
        this.panelFooterEl.innerHTML = `<button class="btn btn--add-layer">add layer</button>`;
        this.addLayerBtn = this.panelFooterEl.querySelector('.btn--add-layer');
        this.render();
    }

    render() {
        let html = '';
        const currentDoc = this.app.state.currentDocument;
        const currentLayer = currentDoc.currentLayer;
        currentDoc.layers.forEach(lyr => {
            // this.panelBodyEl.insertAdjacentHTML('afterbegin', this.getLayerHtml(lyr));
            html += this.getLayerHtml(lyr);
        });
        this.panelBodyEl.innerHTML = html;
        console.log(
            this.panelBodyEl.querySelector(`.layer[data-target-layer="${currentLayer.canvas.id}"]`)
        );
        this.panelBodyEl.querySelector(`.layer[data-target-layer="${currentLayer.canvas.id}"]`).classList.add('active');
    }

    getLayerHtml(layer) {
        return `
            <div class="layer" data-target-layer="${layer.canvas.id}">
                <div class="layer-thumbnail"></div>
                <div class="layer-name">${layer.canvas.id}</div>
                <div class="layer-actions"></div>
            </div>
        `;
    }

    onClick(e) {
        //if(e.target ===)
        const layer = e.target.closest('.layer');
        if(layer) {
            if(!layer.dataset.targetLayer) return;
            const layerId = +layer.dataset.targetLayer.split('-')[1];
            this.app.state.currentDocument.setCurrentLayerByIndex(layerId);
            this.render();
        }
        if(e.target === this.addLayerBtn) {
            const layer = this.app.state.currentDocument.addLayer();
            this.render();
        }
    }
};

export {
    LayersPanel
};
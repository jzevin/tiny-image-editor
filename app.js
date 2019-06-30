import { View } from './lib/View.mjs';
import { CanvasDocument } from "./lib/CanvasDocument.mjs";
import { LayersPanel } from './lib/LayersPanel.mjs';

class State {
    _currentDocument;
    constructor(document) {
        this.currentDocument = document;
    }
    set currentDocument(document) {
        this._currentDocument = document;
    }
    get currentDocument() {
        return this._currentDocument;
    }
}

class App {
    
    state;
    view;
    observers = [];
    documents = [];
    panels = [];

    constructor() {
        this.view = new View(this, document.querySelector('#app'));
        const doc = new CanvasDocument(
            this,
            this.view.dom.documentsEl,
            400, 300
        );
        this.state = new State(doc);
        const layersPanel = new LayersPanel(
            this,
            'Layers', 
            this.view.dom.panelsEl
        );
        this.documents.push(doc);
        this.panels.push(layersPanel);
        document.addEventListener('mousemove', e => this.onEvent(e));
        document.addEventListener('mousedown', e => this.onEvent(e));
        document.addEventListener('mouseup', e => this.onEvent(e));
        document.addEventListener('click', e => this.onEvent(e));
        window.requestAnimationFrame(t => this.onEvent(t));
    }

    onEvent(e) {
        if(e instanceof MouseEvent) {
            this.observers.forEach(obs => {
                if(obs.type === e.type) {
                    obs.cb(e);
                }
            });
        } else {
            // NOTE: This could be optimized with dif sub array
            // but think fine for now since list is small
            window.requestAnimationFrame(t => this.onEvent(t));
            this.observers.forEach(obs => {
                if(obs.type === 'raf') {
                    obs.cb(e);
                }
            });
        }
    }

    subscribe(eventName, cb) {
        this.observers.push({
            type: eventName,
            cb
        });
        console.log(eventName, 'subscribed');
    }
}

const app = new App();
console.log(app);
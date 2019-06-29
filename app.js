import { View } from './lib/View.mjs';
import { CanvasDocument } from "./lib/CanvasDocument.mjs";

class App {
    
    observers = [];
    documents = [];

    constructor(params) {
        this.view = new View(this, document.querySelector('#app'));
        this.documents.push(
            new CanvasDocument(this, this.view.dom.documentsEl, 500, 400)
        );
        document.addEventListener('mousemove', e => this.onEvent(e));
        document.addEventListener('mousedown', e => this.onEvent(e));
        document.addEventListener('mouseup', e => this.onEvent(e));
    }

    onEvent(e) {
        this.observers.forEach(obs => {
            if(obs.type === e.type) {
                obs.cb(e);
            }
        });
    }

    subscribe(eventName, cb) {
        this.observers.push({
            type: eventName,
            cb
        })
    }
}

const app = new App();
console.log(app);
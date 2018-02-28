// mode.js
import Component from "./component.js";

import './mode.css';

/*
* [Event name: params]
* click: this, mode
*/

export default class Mode extends Component{
    static getRootClass(){
        return '.mode';
    }

    constructor(root){
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));

        this.reset();
    }

    reset(){
        // do nothing
    }

    handleDomClick(e){
        //console.log(this.mode + ' was clicked.');
        //console.log(this);
        this.fire('click', this); // give the mode object
    }



}

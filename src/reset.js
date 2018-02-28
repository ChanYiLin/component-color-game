import Component from './component.js';

import './reset.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        this.resetDisplay = root.querySelector(".reset span");
        this.reset();
    }

    reset(mode) {
        console.log(mode);
        this.resetDisplay.textContent = "New Color";
        
        if(mode === "Nightmare"){
            this.root.style.opacity = 0;
        }else{
            this.root.style.opacity = 1;
        }
    }

    showPlayAgain() {
        this.root.style.opacity = 1;
        this.resetDisplay.textContent = "Play Again";
    }


    handleDomClick(e) {
        this.fire('click');
    }
}

import Component from './component.js';
import Mode from './mode.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.brand = root.querySelector('.brand');
        
        this.modes = []; // 3 modes
        const elems =  root.querySelectorAll(Mode.getRootClass());
        for(let elem of elems){
            const mode = new Mode(elem);
            mode.on("click", this.handleModeClick.bind(this));
            this.modes.push(mode);
        }


        this.reset();
    }

    reset() {
        // do nothing
    }

    // handle mode click
    // 1. add the selected class to the mode being clicked.
    // 2. fire the modeChange event.
    handleModeClick(firer, selectedMode){
        for(let mode of this.modes){
            mode.root.classList.remove('selected');
        }
        console.log(selectedMode.root);
        selectedMode.root.classList.add('selected');

        this.fire('changeMode', selectedMode.root.textContent);
        console.log('change mode to' + selectedMode.root.textContext);
        //console.log('navbar receive the event:' + e);
    }
}

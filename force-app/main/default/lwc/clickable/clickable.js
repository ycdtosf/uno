import { LightningElement, api  } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class Clickable extends LightningElement {

    @api label;
    @api isClicked = false;

    handleClick(e) {
        this.dispatchEvent(new FlowAttributeChangeEvent('isClicked', true));
        this.dispatchEvent(new FlowNavigationNextEvent());
    }

}
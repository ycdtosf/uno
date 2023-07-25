import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class UnoTurnFooter extends LightningElement {

    @api availableActions = [];
    @api playableCardCount = 0;

    @track _selectedGameCard;
    @api
    set selectedGameCard(value) {
        if (value) {
            this._selectedGameCard = value;
        }
    };
    get selectedGameCard() {
        return this._selectedGameCard;
    }

    @track _selectedAction;
    @api
    set selectedAction(value) {
        if (value) {
            this._selectedAction = value;
        }
    };
    get selectedAction() {
        return this._selectedAction;
    }

    get playCardLabel() {
        if(this.playableCardCount === 0) return 'No Cards to Play...';
        if(this.selectedGameCard !== undefined) return 'Play ' + this.selectedGameCard.Label__c + ' Card';
        return 'Select a Card to play...';
    }

    get isPlayCardActive() {
        return this.playableCardCount > 0 && this.selectedGameCard !== undefined;
    }

    get isPlayCardButtonDisabled() {
        if(this.isPlayCardActive === true) this.updateCss();
        return !this.isPlayCardActive;
    }

    handleClick(e) {
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedAction', e.target.value));
        this.dispatchEvent(new FlowNavigationNextEvent());
    }

    updateCss() {
        var css = this.template.host.style;
        var color = this.selectedGameCard.Color__c.toLowerCase();
        css.setProperty('--uno-color', color);
        if(color === 'yellow') {
            css.setProperty('--uno-contrast-color', 'black');
        }
        else {
            css.setProperty('--uno-contrast-color', 'white');
        }
        
    }

}
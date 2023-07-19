import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class UnoTurnFooter extends LightningElement {

    @api availableActions = [];
    @api playableCards = 0;

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

    @track _selectedCard;
    @api
    set selectedCard(value) {
        if (value) {
            this._selectedCard = value;
            this.updateCss();
        }
    };
    get selectedCard() {
        return this._selectedCard;
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
        if(this.playableCards === 0) return 'No Cards to Play...';
        if(this.selectedGameCard !== undefined) return 'Play ' + this.selectedCard.fields.Name.value + ' Card';
        return 'Select a Card to play...';
    }

    get isPlayCardActive() {
        return this.playableCards > 0 && this.selectedGameCard !== undefined;
    }

    get isPlayCardButtonDisabled() {
        return !this.isPlayCardActive;
    }

    get selectedCardColor() {
        if(this.selectedCard.fields.Color__c.value) return this.selectedCard.fields.Color__c.value.toLowerCase();
        return 'black';
    }

    handleClick(e) {
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedAction', e.target.value));
        this.dispatchEvent(new FlowNavigationNextEvent());
    }

    updateCss() {
        var css = this.template.host.style;
        var color = this.selectedCardColor;
        css.setProperty('--uno-color', color);
        if(color === 'yellow') {
            css.setProperty('--uno-contrast-color', 'black');
        }
        else {
            css.setProperty('--uno-contrast-color', 'white');
        }
        
    }

}
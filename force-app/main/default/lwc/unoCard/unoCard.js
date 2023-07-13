import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class UnoCard extends LightningElement {

    @api gameCard;
    card;

    get cardId() {
        return this.gameCard.Card__c;
    }

    get cardJSON() {
        return JSON.stringify(this.card);
    }

    get cardColor() {
        if(this.card && this.card.fields.Color__c.value) return this.card.fields.Color__c.value.toLowerCase();
        return 'black';
    }

    @wire(getRecord, { recordId: '$cardId', layoutTypes: ['Full'] })
    wiredCard({ error, data }) {
        if (data) {
            this.card = data;
            this.updateCss();
        } else if (error) {
            console.log(JSON.stringify(error));
        }
    };

    handleClick(e) {
        const selectedEvent = new CustomEvent('selected', { detail: {
            gameCard : this.gameCard,
            card : this.card
        } });
        this.dispatchEvent(selectedEvent);
    }

    updateCss() {
        var css = this.template.host.style;
        var color = this.cardColor;
        css.setProperty('--uno-card-color', color);
        if(color === 'yellow') {
            css.setProperty('--uno-card-contrast-color', 'black');
        }
        else {
            css.setProperty('--uno-card-contrast-color', 'white');
        }
        
    }

}
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

    @wire(getRecord, { recordId: '$cardId', layoutTypes: ['Full'] })
    wiredCard({ error, data }) {
        if (data) {
            this.card = data;
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

}
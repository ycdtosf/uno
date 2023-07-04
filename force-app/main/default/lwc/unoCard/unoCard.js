import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class UnoCard extends LightningElement {

    @api gameCard;

    get cardId() {
        return this.gameCard.Card__c;
    }

    get cardJSON() {
        return JSON.stringify(this.card);
    }

    @wire(getRecord, { recordId: '$cardId', layoutTypes: ['Full'] })
    card;

}
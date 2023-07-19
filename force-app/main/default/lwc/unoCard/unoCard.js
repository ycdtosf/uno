import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class UnoCard extends LightningElement {

    @api gameCard;
    @api topGameCard;
    @api topCard;
    @api topColor;
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

    get isPlayerHand() {
        return this.topGameCard !== undefined && this.topCard !== undefined;
    }

    @api get isCardLoaded() {
        return this.card !== undefined;
    }

    @api get isPlayable() {

        // top card scenario
        if(this.isPlayerHand === false) return true;

        if(this.card && this.isPlayerHand) {

            // scenario: brand new game and Wild or Draw Four are on top
            if(this.topColor === 'Black') return true;

            // match on color...
            if(this.card.fields.Color__c.value === this.topColor) return true;

            // match in value...
            if(this.card.fields.Value__c.value === this.topCard.Value__c) return true;

        }

        return false;

    }

    @wire(getRecord, { recordId: '$cardId', layoutTypes: ['Full'] })
    wiredCard({ error, data }) {
        if (data) {
            this.card = data;
            this.updateCss();

            const cardLoaded = new CustomEvent('cardloaded', {} );
            this.dispatchEvent(cardLoaded);

        } else if (error) {
            console.log(JSON.stringify(error));
        }
    };

    handleClick(e) {

        if(this.isPlayerHand && this.isPlayable) {
            const selectedEvent = new CustomEvent('selected', { detail: {
                gameCard : this.gameCard,
                card : this.card
            } });
            this.dispatchEvent(selectedEvent);
        }
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

        if(!this.isPlayerHand && this.isPlayable) {
            css.setProperty('cursor', 'not-allowed');
            css.setProperty('opacity', '1.0');
        }
        else if(this.isPlayerHand && this.isPlayable) {
            css.setProperty('cursor', 'pointer');
            css.setProperty('opacity', '1.0');
        }
        else {
            css.setProperty('cursor', 'not-allowed');
            css.setProperty('opacity', '0.5');
        }
        
    }

}
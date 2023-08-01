import { LightningElement, api } from 'lwc';

export default class UnoCard extends LightningElement {

    @api gameCard;
    @api topGameCard;
    @api isDrawCard = false;
    @api isDrawCardDrawn = false;

    get isPlayerHand() {
        return this.topGameCard !== undefined;
    }

    // 2023-08-01 - cannot play draw two on draw two

    @api get isPlayable() {

        // top card scenario
        if(this.isPlayerHand === false) return true;

        if(this.isPlayerHand === true) {

            // scenario: brand new game and Wild or Draw Four are on top
            if(this.topColor === 'Black') return true;

            // match on color...
            if(this.gameCard.Color__c === this.topGameCard.Color__c) return true;

            // match in value...
            if(this.gameCard.Value__c === this.topGameCard.Value__c) return true;

        }

        return false;

    }

    connectedCallback() {
        this.updateCss();
        const cardLoaded = new CustomEvent('cardloaded', {} );
        this.dispatchEvent(cardLoaded);
    }

    handleClick(e) {

        if(this.isPlayerHand && this.isPlayable) {
            const selectedEvent = new CustomEvent('selected', { detail: {
                gameCard : this.gameCard
            } });
            this.dispatchEvent(selectedEvent);
        }
    }

    updateCss() {
        var css = this.template.host.style;
        var color = this.gameCard.Color__c.toLowerCase();
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
import { LightningElement, api,track } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class UnoHand extends LightningElement {

    @track _selectedGameCard;
    @api playerGameCards;
    @api topGameCard;
    @api topColor;

    @api playableCardCount = 0;

    @api
    set selectedGameCard(value) {
        if (value) {
            this._selectedGameCard = value;
        }
    };
    get selectedGameCard() {
        return this._selectedGameCard;
    }

    handleCardLoaded(e) {
        let unoCards = this.template.querySelectorAll('c-uno-card');
        let count = 0;
        unoCards.forEach((unoCard) => {
            if(unoCard.isPlayable) {
                count++;
            }
        });

        this.dispatchEvent(new FlowAttributeChangeEvent('playableCardCount', count));

    }

    handleGameCardSelected(e) {
    
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedGameCard', e.detail.gameCard));

    }


}
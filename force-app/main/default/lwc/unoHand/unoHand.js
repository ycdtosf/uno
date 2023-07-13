import { LightningElement, api,track } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class UnoHand extends LightningElement {

    @track _selectedGameCard;
    @track _selectedCard;

    @api gameCards;
    

    @api
    set selectedGameCard(value) {
        if (value) {
            this._selectedGameCard = value;
        }
    };
    get selectedGameCard() {
        return this._selectedGameCard;
    }

    @api
    set selectedCard(value) {
        if (value) {
            this._selectedCard = value;
        }
    };
    get selectedCard() {
        return this._selectedCard;
    }
    

    /*
    @wire(getRelatedListRecords, {
        parentRecordId: '$pileId',
        relatedListId: 'GameCards__r',
        fields: ['GameCard__c.Name','GameCard__c.Id']
    })
    gameCards;*/

    handleGameCardSelected(e) {
        
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedGameCard', e.detail.gameCard));
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedCard', e.detail.card));

    }


}
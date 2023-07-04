import { LightningElement, api } from 'lwc';

export default class UnoHand extends LightningElement {

    @api gameCards;

    /*
    @wire(getRelatedListRecords, {
        parentRecordId: '$pileId',
        relatedListId: 'GameCards__r',
        fields: ['GameCard__c.Name','GameCard__c.Id']
    })
    gameCards;*/

}
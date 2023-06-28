import { LightningElement, api } from 'lwc';
//import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class UnoHand extends LightningElement {

    @api pileId;

    /*
    @wire(getRelatedListRecords, {
        parentRecordId: '$pileId',
        relatedListId: 'GameCards__r',
        fields: ['GameCard__c.Name','GameCard__c.Id']
    })
    gameCards;*/

}
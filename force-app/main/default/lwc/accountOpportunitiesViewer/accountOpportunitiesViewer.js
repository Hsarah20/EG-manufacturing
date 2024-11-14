import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { reduceErrors } from 'c/ldsUtils';
import NAME from '@salesforce/schema/Opportunity.Name';
import AMOUNT from '@salesforce/schema/Opportunity.Amount';
import CLOSEDATE from '@salesforce/schema/Opportunity.CloseDate';
import STAGENAME from '@salesforce/schema/Opportunity.StageName';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    opportunities;
    errors;
    columns = [
        { label: 'Nom Opportunité', fieldName: NAME.fieldApiName, type: 'text' },
        { label: 'Montant', fieldName: AMOUNT.fieldApiName, type: 'currency' },
        { label: 'Date de Clôture', fieldName: CLOSEDATE.fieldApiName, type: 'date' },
        { label: 'Phase', fieldName: STAGENAME.fieldApiName, type: 'text' }
    ];

    @wire(getOpportunities, { recordId: '$recordId' })
    wiredOpportunities({ data, error }) {
        if (data) {
            this.opportunities = data;
            this.errors = undefined;
            console.log("DATA OPPORTUNITIES " + this.opportunities);
        } else if (error) {
            console.error('Erreur de récupération des opportunités:', error);
            this.errors = reduceErrors(error);
            this.opportunities = undefined;
        }
    }

    handleRafraichir() {
        return refreshApex(this.wiredOpportunities);
    }

}
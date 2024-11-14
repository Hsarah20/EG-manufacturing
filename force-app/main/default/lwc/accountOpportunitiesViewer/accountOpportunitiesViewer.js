import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { reduceErrors } from 'c/ldsUtils';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

COLUMNS = [
    { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
    { label: 'Montant', fieldName: 'Amount', type: 'currency' },
    { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date', typeAttributes: { day: 'numeric', month: 'short', year: 'numeric' } },
    { label: 'Phase', fieldName: 'StageName', type: 'text' }
];
export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    opportunities;
    errors;
    columns = COLUMNS;

    @wire(getOpportunities, { accountId: this.recordId })
    wiredOpportunities({ data, error }) {
        if (data) {
            this.opportunities = data;
            this.errors = undefined;
            console.log("DATA" + data)
            console.log("OPPORTUNITIES " + this.opportunities);
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
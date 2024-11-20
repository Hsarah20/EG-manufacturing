import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

const COLUMNS = [
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
    wiredResult;

    connectedCallback(event) {
        console.log('ID ' + this.recordId)
    }

    @wire(getOpportunities, { accountId: '$recordId' })
    wiredOpportunities(result) {
        this.wiredResult = result;
        if (result.data) {
            this.opportunities = result.data;
            this.errors = undefined;
        } else if (result.error) {
            this.errors = result.error;
            this.opportunities = undefined;
        }
    }
    get hasOpportunities() {
        return (this.opportunities && this.opportunities.length > 0);
    }

    handleRefresh() {
        refreshApex(this.wiredResult)
            .then(() => {
                this.showToast('Succès', 'Les données ont été rafraîchies avec succès.', 'success');
            })
            .catch(error => {
                this.showToast('Erreur', 'Échec lors du rafraîchissement des données.', 'error');
                console.error('Erreur lors du rafraîchissement :', error);
            });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

}
import { LightningElement, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    @api recordId;
    cases;
    error;
    searchTerm = '';
    columns = COLUMNS;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                this.cases = result;
                this.error = undefined;
            })
            .catch(error => {
                //this.error = 'Une erreur est survenue lors de la recherche des cases.';
                console.error('Erreur lors de la recherche des cases:', error);
                this.error = 'Une erreur est survenue lors de la recherche des cases.';
                this.cases = undefined;
            });
    }
}
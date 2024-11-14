import { LightningElement, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
    { label: 'Date de Création', fieldName: 'CreatedDate', type: 'date', typeAttributes: { day: 'numeric', month: 'short', year: 'numeric' } }
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
        if (!this.searchTerm.trim()) {
            this.error = 'Veuillez entrer un terme de recherche.';
            this.cases = undefined;
            return;
        }
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                if (result.length > 0) {
                    this.cases = result;
                    this.error = undefined;
                } else {
                    this.error = 'Aucun cas trouvé pour le sujet donné.';
                    this.cases = undefined;
                }
            })
            .catch(error => {
                console.error('Erreur lors de la recherche des cases:', error);
                this.error = 'Une erreur est survenue lors de la recherche des cases.';
                this.cases = undefined;
            });
    }
}
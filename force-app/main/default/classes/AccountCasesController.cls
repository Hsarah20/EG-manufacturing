public with sharing class AccountCasesController {

    @AuraEnabled(cacheable=true)
    public static  List<Case> findCasesBySubject(String accountId, String subjectSearchTerm){

        if (String.isEmpty(accountId) || String.isEmpty(subjectSearchTerm)) {
            throw new AuraHandledException('L\'ID du compte et le terme de recherche sont requis.');
        }
        try {
            return [SELECT Id, Subject, Status, Priority, CreatedDate
                    FROM Case
                    WHERE AccountId = :accountId AND Subject LIKE :('%' + subjectSearchTerm + '%')
                    ORDER BY CreatedDate DESC
                    LIMIT 50];
        } catch (Exception e) {
            throw new AuraHandledException('Erreur lors de la recherche des cas : ' + e.getMessage());
        }
        

    }


}
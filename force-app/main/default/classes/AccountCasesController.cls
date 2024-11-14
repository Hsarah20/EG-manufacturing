public with sharing class AccountCasesController {

    @AuraEnabled
    public static void findCasesBySubject(){
        return [SELECT Id, Subject, Status, Priority 
                FROM Case
                WHERE Subject LIKE :('%' + Subject + '%') 
                ORDER BY CreatedDate DESC];

    }


}
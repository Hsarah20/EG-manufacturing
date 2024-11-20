public with sharing class AccountOpportunitiesController {
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunities(ID accountId) {
        return OpportunitySelector.getOpportunitiesByAccountId(accountId);
    }
}
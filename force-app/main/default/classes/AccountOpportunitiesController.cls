public with sharing class AccountOpportunitiesController {
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunities(String accountId) {
        return OpportunitySelector.getOpportunitiesByAccountId(accountId);
    }
}
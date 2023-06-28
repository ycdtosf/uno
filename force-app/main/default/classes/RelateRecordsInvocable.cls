public class RelateRecordsInvocable {
    @InvocableMethod
    public static void execute(List<Request> requests) {
       
        for(Request request : requests) {
            for(Integer x = 0; x < request.sources.size(); x++) {
                sObject source = request.sources[x];
                sObject related = request.relateds[x];
                Object sourceValue = source.get(request.sourceField);
                related.put(request.relatedField, sourceValue);
            }
        }

    }

    public class Request {
        @InvocableVariable
        public List<sObject> sources;
        @InvocableVariable
        public List<sObject> relateds;
        @InvocableVariable
        public String sourceField;
        @InvocableVariable
        public String relatedField;
    }

}
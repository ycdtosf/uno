public class ShuffleRecordsInvocable {
    @InvocableMethod
    public static void execute(List<Request> requests) {
       
        for(Request request : requests) {
            for(sObject record : request.records) {
                record.put(request.field, Math.random());
            }
        }

    }

    public class Request {
        @InvocableVariable
        public List<sObject> records;
        @InvocableVariable
        public String field;
    }

}
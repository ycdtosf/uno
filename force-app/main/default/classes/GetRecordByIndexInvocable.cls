public class GetRecordByIndexInvocable {
    @InvocableMethod
    public static List<sObject> execute(List<Request> requests) {
       
        List<sObject> returnedRecords = new List<SObject>();

        for(Request request : requests) {
            returnedRecords.add(request.records[request.index]);
        }

        return returnedRecords;

    }

    public class Request {
        @InvocableVariable
        public List<sObject> records;
        @InvocableVariable
        public Integer index;
    }
}
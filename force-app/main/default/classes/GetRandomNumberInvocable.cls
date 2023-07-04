public class GetRandomNumberInvocable {
    @InvocableMethod
    public static List<Decimal> execute() {
        return new List<Decimal> { Math.random() };  
    }
 
}
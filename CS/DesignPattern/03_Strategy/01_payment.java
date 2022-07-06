import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

interface PaymentStrategy {
    public void pay(int amount);
}

class KAKAOCardStrategy implements PaymentStrategy {
    private String name;
    private String cardNumber;
    private String cvv;
    private String dateOfExpiry;

    public KAKAOCardStrategy(String nm, String ccNum, String cvv, String expiryDate) {
        this.name = nm;
        this.cardNumber = ccNum;
        this.cvv = cvv;
        this.dateOfExpiry = expiryDate;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using KAKAOCard.");
    }
}

class LUNACardStategy implements PaymentStrategy {
    private String emailId;
    private String password;

    public LUNACardStategy(String email, String pwd) {
        this.emailId = email;
        this.password = pwd;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using LUNACard.");
    }
}

class Item {
    private String name;
    private int price;
    
    public Item(String name, int cost) {
        this.name = name;
        this.price = cost;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}

class ShoppingCart {
    List<Item> items;

    public ShoppingCart() {
        this.items = new ArrayList<Item>();
    }

    public void addItem(Item item) {
        this.items.add(item);
    }

    public void removeItem(Item item) {
        this.items.remove(item);
    }

    public int calculateTotal() {
        int sum = 0;
        for (Item item : items) {
            sum += item.getPrice();
        }
        return sum;
    }

    public void pay(PaymentStrategy paymentMethod) {
        int amount = calculateTotal();
        paymentMethod.pay(amount);
    }
}

public class HelloWorld {
    public static void main(String[] args){
        ShoppingCart cart = new ShoppingCart();

        Item A = new Item("FordA", 100);
        Item B = new Item("FordB", 300);

        cart.addItem(A);
        cart.addItem(B);

        // pay by LUNA Card
        cart.pay(new LUNACardStategy("ford@example.com", "fordpwd"));

        // pay by KAKAO Card
        cart.pay(new KAKAOCardStrategy("ford", "1234123412341234", "123", "1225"));
    }
}
/*
400 paid using LUNACard.
400 paid using KAKAOCard.
 */
/** 할인 생성 팩토리 */
public interface DiscounterFactory {
    Discountable getDiscounter(String discountName);
}

public class SimpleDiscounterFactory implements DiscountFactory {
    @Override
    Discountable getDiscounter(String discountName) {
        if ("NAVER".equals(discountCode)) {   // 네이버검색 할인
            return new NaverDiscountPolicy();
        } else if ("DANAWA".equals(discountCode)) { // 다나와검색 할인
            return new DanawaDiscountPolicy();
        } else if ("FANCAFE".equals(discountCode)) {  // 팬카페 할인
            return new FancafeDiscountPolicy();
        } else {
            return Discountable.NONE;
        }
    }
}

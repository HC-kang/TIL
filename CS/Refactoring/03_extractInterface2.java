public class PaymentService {
    // 실시간 할인내역 확인
    public Discount getDiscount(...) {
        // 상품금액
        long productAmt = ...;
        // 할인코드 (NONE:할인없음, NAVER:네이버검색-10% 할인, FANCAFE:팬카페-1000원 할인)
        String discountCode = ...;
        // 할인정책
        Discountable discountPolicy = getDiscounter(discountCode);

        // 할인금액
        long discountAmt = discountPolicy.getDiscountAmt(productAmt);
        ...
    }

    // 결제처리
    public void payment(...) {
        // 상품금액
        long productAmt = ...;
        // 할인코드 (NONE:할인없음, NAVER:네이버검색-10% 할인, FANCAFE:팬카페-1000원 할인)
        String discountCode = ...;
        // 할인정책
        Discountable discountPolicy = getDiscounter(discountCode);

        // 결제금액
        long paymentAmt = productAmt - discountPolicy.getDiscountAmt(productAmt);
        ...
    }

    private Discountable getDiscounter(String discountCode) {
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
    ...
public class PaymentService {
    // 실시간 할인내역 확인
    public Discount getDiscount(...) {
        // 상품금액
        long productAmt = ...;
        // 할인코드 (NAVER:네이버검색-10%, DANAWA:다나와검색-15% FANCAFE:팬카페-1000원)
        String discountCode = ...;

        // 할인금액
        long discountAmt = getDiscountAmt(discountCode, productAmt);
        ...
    }

    // 결제처리
    public void payment(...) {
        // 상품금액
        long productAmt = ...;
        // 할인코드 (NAVER:네이버검색-10%, DANAWA:다나와검색-15% FANCAFE:팬카페-1000원)
        String discountCode = ...;

        // 결제금액
        long paymentAmt = productAmt - getDiscountAmt(discountCode, productAmt);
        ...
    }

    private long getDiscountAmt(String discountCode, long productAmt) {
        long discountAmt = 0;
        if ("NAVER".equals(discountCode)) {   // 네이버검색 할인
            discountAmt = productAmt * 0.1;
        } else if ("DANAWA".equals(discountCode)) { // 다나와검색 할인
            discountAmt = productAmt * 0.15;
        } else if ("FANCAFE".equals(discountCode)) {  // 팬카페인입 할인
            if (productAmt < 1000)  // 할인쿠폰 금액보다 적은경우
                discountAmt = productAmt;
            else
                discountAmt = 1000;
        }
        return discountAmt;
    }
    ...
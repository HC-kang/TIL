# 회문 검출기
def is_palindrome(w):
    """역방향 슬라이싱을 통한 회문검출"""
    return w[::-1] == w


def is_palindrome2(w):
    """맨앞, 맨 뒤의 문자를 비교하고 같으면 다음 문자를 비교, 다르면 false"""
    while len(w) > 1:
        if w[0] != w[-1]:
            return False
        w = w[1:-1]
    
    return True


# ----------------------------------

word = 'level'
word2 = 'algorithm'

is_palindrome(word) # True
is_palindrome(word2) # False

is_palindrome2(word) # True
is_palindrome2(word2) # False
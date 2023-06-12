# bars = input().strip()
# bars = bars.replace('()', '|')
# bars = bars.replace(')(', ') (')
# k = ''
# i = 0
# for b in bars:
#     if b == '(':
#         i += 1
#         k += str(i)
#     elif b == ')':
#         k += str(i)
#         i -= 1
#     elif b == '|':
#         k += ' '
#     elif b == ' ':
#         k += ' '
# print(bars)
# print(k)

# ----------------------
# bars = input().strip()
# result = 0
# st = []

# for b in bars:
#     if b == '(':
#         st.append(b)
#     elif b == ')':
#         if st and st[-1] == '(':
#             st.pop()
#             result += len(st)
#         else:
#             st.pop()
#             result += 1
# print(result)

'''
(((()(()()))(())()))(()())
123  4    433  3  211    1
   3  4 4 11 3 12 11 1 1 1 
   
(((())()))()
123443443233
'''

bars = list(input())
answer = 0
st = []

for i in range(len(bars)):
    if bars[i] == '(':
        st.append('(')
    else:
        if bars[i-1] == '(': 
            st.pop()
            answer += len(st)
        else:
            st.pop() 
            answer += 1 

print(answer)
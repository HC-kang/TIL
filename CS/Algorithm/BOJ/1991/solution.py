# import sys
# input = sys.stdin.readline

# N = int(input().rstrip())

# class TreeNode:
#     def __init__(self, value):
#         self.value = value
#         self.left = None
#         self.right = None

# nodes = [list(input().rstrip().split()) for _ in range(N)]

# def build_tree(n, nodes):
#     tree = {}
#     for node in nodes:
#         parent, left, right = node
#         if parent not in tree:
#             tree[parent] = TreeNode(parent)
#         if left != '.':
#             tree[parent].left = TreeNode(left)
#         if right != '.':
#             tree[parent].right = TreeNode(right)
#     return tree

# def preorder(node):
#     if node is None:
#         return
#     print(node.value, end='')
#     if node.left is not None:
#         preorder(tree[node.left.value])
#     if node.right is not None:
#         preorder(tree[node.right.value])

# def inorder(node):
#     if node is None:
#         return 
#     if node.left is not None:
#         inorder(tree[node.left.value])
#     print(node.value, end='')
#     if node.right is not None:
#         inorder(tree[node.right.value])

# def postorder(node):
#     if node is None:
#         return
#     if node.left is not None:
#         postorder(tree[node.left.value])
#     if node.right is not None:
#         postorder(tree[node.right.value])
#     print(node.value, end='')

# tree = build_tree(N, nodes)
# print(preorder(tree['A']))
# print(inorder(tree['A']))
# print(postorder(tree['A']))

# -------------------------------------

N = int(input())
nodes = [list(input().rstrip().split()) for _ in range(N)]

class Node():
    def __init__(self, item, left, right):
        self.item = item
        self.left = left
        self.right = right

def preorder(node):
    print(node.item, end = '')
    if node.left != '.':
        preorder(tree[node.left])
    if node.right != '.':
        preorder(tree[node.right])
        
def inorder(node):
    if node.left != '.':
        inorder(tree[node.left])
    print(node.item, end = '')
    if node.right != '.':
        inorder(tree[node.right])
        
def postorder(node):
    if node.left != '.':
        postorder(tree[node.left])
    if node.right != '.':
        postorder(tree[node.right])
    print(node.item, end = '')

tree = {}
for item, left, right in nodes:
    tree[item] = Node(item, left, right)
preorder(tree['A'])
print()
inorder(tree['A'])
print()
postorder(tree['A'])
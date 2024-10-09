import sys

class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if not self.stack:
            return False
        else:
            return self.stack.pop()

    def is_empty(self):
        return not self.stack


def checkbalanced(line):
    stack = Stack()
    breaked = False
    for i in line:
        if i == '(' or i == '[':
            stack.push(i)
        elif i == ')':
            if not stack.pop() == '(':
                print('no')
                breaked = True
                break
        elif i == ']':
            if not stack.pop() == '[':
                print('no')
                breaked = True
                break
    if not breaked:
        if stack.is_empty():
            print('yes')
        else:
            print('no')


while True:
    line = sys.stdin.readline().rstrip('\n')
    if line != '.':
        checkbalanced(line)
    else:
        exit(0)

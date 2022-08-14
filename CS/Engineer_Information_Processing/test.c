#include <stdio.h>
#include <stdlib.h>

struct NODE {
    int data;
    struct NODE *Next;
};

struct NODE *head;

void Push(int data) {
    struct NODE *end = malloc(sizeof(struct NODE));
    end->Next = head->Next;
    end->data = data;
    head->Next = end;
}

int Pop() {
    int a;

    struct NODE *del = head->Next;
    head->Next = del->Next;
    a = del->data;
    free(del);
    return a;
}

main() {
    int r;
    head = malloc(sizeof(struct NODE));
    head->Next = NULL;

    Push(10);
    Push(20);
    Push(30);

    r = Pop();
    printf("%d\n", r);
    r = Pop();
    printf("%d\n", r);
    r = Pop();
    printf("%d\n", r);
}
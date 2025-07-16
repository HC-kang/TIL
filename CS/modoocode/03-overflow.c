#include <limits.h>
#include <stdio.h>

int main(void) {
    int x = INT_MAX;
    int y = x + 1;   // ← signed overflow → UB
    printf("y = %d\n", y);
    return 0;
}

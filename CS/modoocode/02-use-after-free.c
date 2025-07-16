#include <stdlib.h>

int main(void) {
    char *p = malloc(4);
    free(p);
    p[0] = 1;
    return 0;
}

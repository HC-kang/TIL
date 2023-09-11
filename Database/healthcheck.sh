#!/bin/bash
set -eo pipefail

# Function to print error message and exit
print_error_and_exit() {
    echo >&2 "$1"
    exit 0
}

# Function to check MySQL health using mysqladmin
check_health_mysqladmin() {
    mysqladmin "${args[@]}" ping > /dev/null && exit 0
}

# Function to check MySQL health using mysql client
check_health_mysql_client() {
    local select="$(echo 'SELECT 1' | mysql "${args[@]}")"
    [ "$select" = '1' ] && exit 0
}

# Pre-Check conditions
if [ "$MYSQL_RANDOM_ROOT_PASSWORD" ] && [ -z "$MYSQL_USER" ] && [ -z "$MYSQL_PASSWORD" ]; then
    print_error_and_exit 'healthcheck error: cannot determine random root password (and MYSQL_USER and MYSQL_PASSWORD were not set)'
fi

# Set up variables
host="$(hostname --ip-address || echo '127.0.0.1')"
user="${MYSQL_USER:-root}"
export MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}"

# Prepare command-line arguments
args=(
    -h"$host"
    -u"$user"
    --silent
)

# Perform health check
if command -v mysqladmin &> /dev/null; then
    check_health_mysqladmin
else
    check_health_mysql_client
fi

# Exit with code 1 if all checks fail
exit 1

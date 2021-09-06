#!/bin/bash

set -eu

echo "Run migrations"
ts-node -r tsconfig-paths/register node_modules/node-pg-migrate/bin/node-pg-migrate -m code/server/migrations --reject-unauthorized false up

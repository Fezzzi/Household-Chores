#!/bin/bash

set -eu

echo "Start API"
API_PORT=$PORT node build-api/server/src/index.js

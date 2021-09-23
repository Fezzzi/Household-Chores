#!/bin/bash

set -eu

echo "Start API"
API_PORT=$PORT node build-api/api/index.js

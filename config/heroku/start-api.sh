#!/bin/bash

set -eu

echo "Start API"
API_PORT=8080 node build-api/bundle.js

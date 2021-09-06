#!/bin/bash

set -eu

npm run build
npm run migrate --no-reject-unauthorized up

#!/bin/bash

FILE=$1

curl --request POST \
  --header "Content-Type: application/graphql" \
  --data "$(cat ${FILE})" \
  ${ENDPOINT}

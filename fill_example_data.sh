#!/bin/bash

api_url="http://localhost:8080/api"

function post {
    data="$1";shift
    url_postfix="$1";shift

    curl --header "Content-Type: application/json" \
  --request POST \
  --data "$data" \
  "$api_url/$url_postfix"
}

function get {
    url_postfix="$1";shift

    curl "$api_url/$url_postfix"
}

function addStudent {
    id="$1";shift
    post "{ \"id\": \"$id\" }" 'student'
}

function addGroup {
    name="$1";shift
    studentIds="$1";shift

    post "{ \"name\": \"$name\", \"studentIds\": [$studentIds] }" 'group'

}

students=(s1 s2 s3 s4 s5)
for student in "${students[@]}"; do
  addStudent "$student"
done

echo "show student state"
get 'student'

addGroup "3B-Mathe" '"s1", "s3"'
addGroup "3B-Englisch" '"s1", "s2", "s5"'

echo "show group state"
get 'group'
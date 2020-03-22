#!/bin/bash -x

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
    data="$1";shift
    post "$data" 'student'
}

function addGroup {
    name="$1";shift
    studentIds="$1";shift

    post "{ \"name\": \"$name\", \"studentIds\": [$studentIds] }" 'group'

}

addStudent '{"id": "s1", "name": "MC Hammer", "email": "hammer@time.com", "sick": false}'
addStudent '{"id": "s2", "name": "Sledge Hammer", "email": "hammering@time.com", "sick": true}'
addStudent '{"id": "s3", "name": "John Travolta", "email": "johnny@hollywood.com", "sick": false}'
addStudent '{"id": "s4", "name": "Mr. T", "email": "t@team.com", "sick": false}'
addStudent '{"id": "s5", "name": "Dr. No", "email": "dr@bond.com", "sick": true}'

echo "show student state"
get 'student'

addGroup "3B-Mathe" '"s1", "s3"'
addGroup "3B-Englisch" '"s1", "s2", "s5"'

echo "show group state"
get 'group'

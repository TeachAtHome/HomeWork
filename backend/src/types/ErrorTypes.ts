export class PersonNotExistingException implements Error {
  name = 'PersonNotExistingException';
  constructor(public message = 'Person does not exist') {}
}

export class PersonAlreadyExistingException implements Error {
  name = 'PersonAlreadyExistingException';
  constructor(public message = 'Person does already exist') {}
}

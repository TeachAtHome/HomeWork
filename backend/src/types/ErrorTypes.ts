export class PersonNotExistingException implements Error {
  name = 'PersonNotExistingException';
  constructor(public message = 'Person does not exist') {}
}

export class PersonAlreadyExistingException implements Error {
  name = 'PersonAlreadyExistingException';
  constructor(public message = 'Person does already exist') {}
}

export class GroupNotExistingException implements Error {
  name = 'PersonNotExistingException';
  constructor(public message = 'Group does not exist') {}
}

export class GroupAlreadyExistingException implements Error {
  name = 'GroupAlreadyExistingException';
  constructor(public message = 'Group does already exist') {}
}

export class DocumentNotExistingException implements Error {
  name = 'DocumentNotFoundException';
  constructor(public message = 'Document does not exist') {}
}

export class AccountDuplicatedError extends Error {
  constructor(accNumber: string) {
    super(`Account ${accNumber} already exists`);
  }
}

export class AccountDoesNotExists extends Error {
  constructor(accNumber: string) {
    super(`Account ${accNumber} does not exists`);
  }
}

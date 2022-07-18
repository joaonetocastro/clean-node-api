import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AddAccount, Encrypter, AddAccountModel, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const password = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({ ...accountData, password })
    return account
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    ) {

    }

    /**
     * Создает пользователя в базе
     * @param dto 
     * @returns 
     */
    async create(address: string, btcAddress: string): Promise<Account> {
        if (await this.accountModel.findOne({ address })) throw new HttpException("Account already exist", HttpStatus.BAD_REQUEST);
        const account: Account = await this.accountModel.create({ address, btcAddress });
        return account;
    }

    /**
     * Возвращает адреса которые есть базе
     * @param addresses 
     */
    async getExists(addresses: Lowercase<string>[]): Promise<Lowercase<string>[]> {
        const accounts: Account[] = await this.accountModel.find({ address: { $in: addresses } }, { address: 1 })
        return accounts.map(x => x.address);
    }
}

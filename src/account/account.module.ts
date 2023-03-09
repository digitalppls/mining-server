import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Account.name, useFactory: () => AccountSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule { }

import { Body, Controller, Post, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountCreateDto } from './account.dto';
import { Account } from './account.schema';
import { AccountService } from './account.service';

@ApiTags("Account")
@Controller('account')
export class AccountController {

    constructor(
        private readonly configService: ConfigService,
        private readonly accountService: AccountService
    ) { }

    @Post("create")
    @ApiResponse({ type: Account })
    async create(@Request() req: Request, @Body() dto: AccountCreateDto): Promise<Account> {
        return this.accountService.create(dto.address, dto.btcAddress);
    }
} 

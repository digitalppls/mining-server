import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BtcComService } from '../btc.com/btc.com.service';

@ApiTags("Pool")
@Controller('pool')
export class PoolController {

    constructor(private readonly btcService: BtcComService) {

    }

    @UseInterceptors(CacheInterceptor)
    @Get("hashrate")
    async hashrate() {
        return this.btcService.realtimeHashrate();
    }
}

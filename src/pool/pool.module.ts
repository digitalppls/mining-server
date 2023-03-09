import { Module } from '@nestjs/common';
import { BtcComModule } from '../btc.com/btc.com.module';
import { PoolController } from './pool.controller';
import { PoolService } from './pool.service';
@Module({
  imports: [BtcComModule],
  providers: [PoolService],
  controllers: [PoolController]
})
export class PoolModule { }

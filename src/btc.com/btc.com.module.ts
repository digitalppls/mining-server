import { Module } from '@nestjs/common';
import { BtcComService } from './btc.com.service';

@Module({
  providers: [BtcComService],
  exports: [BtcComService]
})
export class BtcComModule { }

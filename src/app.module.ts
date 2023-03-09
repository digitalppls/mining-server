import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from '@nestjs/throttler';
import { AccountModule } from './account/account.module';
import { AppService } from './app.service';
import { BtcComModule } from './btc.com/btc.com.module';
import { PoolModule } from './pool/pool.module';
import { WorkerModule } from './worker/worker.module';

@Module({

  imports: [

    ThrottlerModule.forRoot({
      limit: 50, // запросов в
      ttl: 10, // секунд
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongodb_url"),
      }),
      inject: [ConfigService]
    }),
    AccountModule,
    BtcComModule,
    WorkerModule,
    PoolModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, store: "memory" }),
  ],
  providers: [AppService],
})
export class AppModule { }

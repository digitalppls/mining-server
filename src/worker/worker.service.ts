import { HttpException, Injectable } from '@nestjs/common';
import { Region } from 'src/btc.com/region.enum';

@Injectable()
export class WorkerService {
    create(accountAddress: string, region: Region) {
        throw new HttpException('Method not implemented.', 0);
    }
}

import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkerCreateDto } from './worker.dto';
import { WorkerService } from './worker.service';

@ApiTags("Worker")
@Controller('worker')
export class WorkerController {

    constructor(private readonly workerService: WorkerService) {

    }

    @Post("create")
    create(@Request() req: Request, @Body() dto: WorkerCreateDto) {
        console.log(dto)
        this.workerService.create(dto.accountAddress, dto.region)
    }

}

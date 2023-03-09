import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsEthereumAddress } from "class-validator";
import { Region } from "src/btc.com/region.enum";
import { IsValidSignatureForAddress } from "src/decorators/IsValidSignatureForAddress";

export class WorkerCreateDto {
    @ApiProperty()
    @IsEthereumAddress()
    accountAddress: string;

    @ApiProperty()
    @IsValidSignatureForAddress("accountAddress")
    signature: string;

    @ApiProperty({ enum: Region })
    @IsEnum(Region)
    region: Region;
}
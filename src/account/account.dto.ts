import { ApiProperty } from "@nestjs/swagger";
import { IsBtcAddress, IsEthereumAddress, IsString } from "class-validator";
import { IsValidSignatureForAddress } from "src/decorators/IsValidSignatureForAddress";
export class AccountCreateDto {
    @IsEthereumAddress()
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    @IsValidSignatureForAddress("address")
    signature: string;

    @IsBtcAddress()
    @ApiProperty()
    btcAddress: string;

}
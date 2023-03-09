import { ConfigService } from '@nestjs/config';
import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { validateSignature } from 'src/utils/crypto';
const configService = new ConfigService();

export function IsValidSignatureForAddress(address: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidSignatureForAddress',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [address],
            options: { message: "Incorrect signature" },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    const sign_message = configService.get("sign_message");
                    return typeof value === 'string' && typeof relatedValue === 'string' && validateSignature(sign_message, relatedValue, value);
                    // you can return a Promise<boolean> here as well, if you want to make async validation
                },
            },
        });
    };
}
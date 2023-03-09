import { Injectable} from "@nestjs/common";
import { ThrottlerGuard} from "@nestjs/throttler";

@Injectable()
export class RateLimiterGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): string {
        let ip = ""+(Math.random()*1000000+new Date().getTime());
        if ( req?.handshake?.headers){
            if(req?.handshake?.headers['cf-connecting-ip']) ip = req?.handshake?.headers['cf-connecting-ip'];
            else if(req?.handshake?.headers['x-real-ip']) ip = req?.handshake?.headers['x-real-ip'];
            else if(req?.handshake?.headers['cookie']) ip = req?.handshake?.headers['cookie'];
        } else if ( req?.headers){
            if(req?.headers['cf-connecting-ip']) ip = req?.headers['cf-connecting-ip'];
            else if(req?.headers['x-real-ip']) ip = req?.headers['x-real-ip'];
            else if(req?.headers['cookie']) ip = req?.headers['cookie'];
        }
        return ip;
    }
}

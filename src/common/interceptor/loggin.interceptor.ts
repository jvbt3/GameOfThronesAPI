import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogsService } from '../../logs/logs.service';
import { CreateLogDto } from '../../logs/dto/create-log.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logsService: LogsService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.url;

    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(async () => {
        const responseTime = `${Date.now() - now}ms`;
        const message = `The request took ${responseTime}ms`;
        console.log(message);

        const statusCode = context.switchToHttp().getResponse().statusCode;
        const log: CreateLogDto = {
          statusCode: statusCode.toString(),
          message,
          method,
          route,
          type: 'timerRequest',
        };
        this.logsService.create(log);
      }),
    );
  }
}

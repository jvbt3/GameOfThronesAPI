import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogsService } from '../../logs/logs.service';
import { CreateLogDto } from '../../logs/dto/create-log.dto';

@Injectable()
export class ErrorLogger implements NestInterceptor {
  constructor(private readonly logsService: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.url;

    return next.handle().pipe(
      catchError(async (err) => {
        console.log(err);
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const message = `Error occurred: ${err.message}`;
        console.error(message);

        const log: CreateLogDto = {
          statusCode,
          message,
          method,
          route,
          type: 'errorLog',
        };
        await this.logsService.create(log);

        return throwError(() => err);
      }),
    );
  }
}

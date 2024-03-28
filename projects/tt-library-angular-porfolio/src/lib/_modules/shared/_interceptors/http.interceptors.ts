import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap, timeout } from 'rxjs/operators';
import { AppConfigService } from '../_services/app-config.service';
import { inject } from '@angular/core';

export class ModuleHttpLogInterceptor implements HttpInterceptor {

  constructor(private appConfigService: AppConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        timeout(this.appConfigService.appConfig?.timeoutMs || 180000),
        filter(e => e.type !== 0),
        tap({
          next: (response: any) => {
            if (response instanceof HttpErrorResponse) {
              // CHECK STATUS FROM SERVER
              if (response.status === 401) {
                /**
                 * Navigate to the un-authorize routing
                 */
              }
            }
          },
          error: (error: any) => {
            console.error(error, error['status']);
            if (error && error.status > 500) {
              return error;
            }
            if (error['status'] === 401) {
            }
          },
        }),
      );
  }
}

export const StandarloneHttpLogInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req)
    .pipe(
      timeout(inject(AppConfigService).appConfig?.timeoutMs || 180000),
      filter(e => e.type !== 0),
      tap({
        next: (response: any) => {
          if (response instanceof HttpErrorResponse) {
            // CHECK STATUS FROM SERVER
            if (response.status === 401) {
              /**
               * Navigate to the un-authorize routing
               */
            }
          }
        },
        error: (error: any) => {
          console.error(error, error['status']);
          if (error && error.status > 500) {
            return error;
          }
          if (error['status'] === 401) {
          }
        },
      }),
    );
  }

import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { EventType } from '@angular/router';
import { map, Observable } from 'rxjs';

export class HttpApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set('X-Requested-With', 'HoA') // X-API-KEY blocked by CORS
    });
    return next.handle(newReq);
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = req.clone({
      headers: req.headers.set('X-Requested-With', 'HoA') // X-API-KEY blocked by CORS
    });
    return next.handle(newReq);
  }
}

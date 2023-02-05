import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function HttpApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const newReq = req.clone({
    headers: req.headers.set('X-Requested-With', 'HoA') // X-API-KEY blocked by CORS
  });
  return next(newReq);
}

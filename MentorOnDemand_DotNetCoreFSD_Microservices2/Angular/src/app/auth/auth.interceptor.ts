import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.userService.getToken();

        if (token) {
            const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getToken()) });
            // console.log('cloned', JSON.stringify(cloned));
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }

        // if (req.headers.get('noauth')) {
        //     console.log('intercepted no-auth');
        //     return next.handle(req);
        // } else {
        //     console.log('intercepted auth');
        //     const clonedreq = req.clone({
        //         headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getToken())
        //     });
        //     return next.handle(clonedreq).pipe(
        //         tap(
        //             event => { },
        //             err => {
        //                 if (err.error.auth === false) {
        //                     this.router.navigateByUrl('/login');
        //                 }
        //             }
        //         )
        //     );
        // }
    }
}
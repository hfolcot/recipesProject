import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    isLoginMode = true;
    loading = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;
        const email = form.value.email;
        const password = form.value.password;
        this.loading = true;

        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
            this.loading = false;

        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(response => {
            console.log(response);
            this.loading = false;
            this.router.navigate(['/recipes']);
        },
            errorResponse => {
                console.warn(errorResponse);
                this.error = `An error occurred: ${errorResponse}`;
                this.loading = false;
            })


        form.reset();
    }
}
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    loading = false;

    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
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
                this.showErrorAlert(errorResponse);
                this.loading = false;
            })


        form.reset();
    }


    private showErrorAlert(err: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = err;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}
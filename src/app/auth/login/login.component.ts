import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    })

    get email() {
        return this.loginForm.get('email')!
    }
    get password() {
        return this.loginForm.get('password')!
    }

    constructor(private auth: AuthService) { }

    async handleSubmit() {
        await this.auth.loginUser(this.loginForm.value).catch(err => this.handleValidationError(err));
    }

    private handleValidationError(error: any) {
        if ((error.message as string).includes('user-not-found')) this.email?.setErrors({ incorrect: true });

        if ((error.message as string).includes('wrong-password')) this.password?.setErrors({ incorrect: true });
    }

    ngOnInit(): void {
    }

}

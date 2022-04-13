import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from '../shared/confirm-password.directive';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirm: new FormControl('', [Validators.required, Validators.minLength(8), confirmPasswordValidator()]),
    })

    get username() {
        return this.signupForm.get('username')!;
    }
    get email() {
        return this.signupForm.get('email')!;
    }
    get password() {
        return this.signupForm.get('password')!;
    }
    get confirm() {
        return this.signupForm.get('confirm')!;
    }

    constructor(private auth: AuthService) { }

    async handleSubmit() {
        // Create user
        await this.auth.signupUser(this.signupForm.value).catch(err => this.handleValidationError(err));
    }

    private handleValidationError(error: any) {
        if ((error.message as string).includes('email-already-in-use')) this.email?.setErrors({ unique: true });
    }

    ngOnInit(): void {
    }

}

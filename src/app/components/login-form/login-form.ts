import {input, Component, effect } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'login-form',
  imports: [JsonPipe, CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  submissionResult: any = null;

   message = input<string>();

   constructor() {
    effect(() => {
      console.log("The message is: ", this.message());
    })
   }

  defName: any = null;

  onSubmit(form: any) {
    if (form.valid) {
      this.submissionResult = form.value;
      const payload = {
        Username: form.value.defName,
        passwordHash: form.value.password
      }
      console.log('Form submitted successfully:', payload);
    }
  }

}

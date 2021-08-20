import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modals/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  client: Client = {};

  constructor(private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.addClientForm = this.fb.group({
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email]),
      'phoneNo': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]),
      'balance': new FormControl('')
    });
  }

  addClient() {
    console.log(this.addClientForm.value);
    if (!this.addClientForm.valid) {
      this.flashMessage.show('Please address the below validation Errors',
        { cssClass: 'alert-danger', timeout: 3000 });
      return;
    }
    this.client.email = this.addClientForm.get('email')?.value;
    this.client.firstName = this.addClientForm.get('firstName')?.value;
    this.client.lastName = this.addClientForm.get('lastName')?.value;
    this.client.balance = this.addClientForm.get('balance')?.value;
    this.client.phoneNo = this.addClientForm.get('phoneNo')?.value;

    this.clientService.addClient(this.client);
    this.flashMessage.show('Client added succesfully',
      { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);

  }

}

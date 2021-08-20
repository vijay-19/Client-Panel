import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modals/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id!: string;
  client!: any;
  editClientForm!: FormGroup;
  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.editClientForm = this.fb.group({
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

    this.clientService.getClient(this.id).subscribe(client => {
      console.log(client);
      this.client = client;
      const clientObj = {
        'firstName': this.client.firstName,
        'lastName': this.client.lastName,
        'email': this.client.email,
        'phoneNo': this.client.phoneNo,
        'balance': this.client.balance
      }
      this.editClientForm.patchValue(clientObj);

    });


  }

  editClient() {
    if (!this.editClientForm.valid) {
      this.flashMessage.show('Please address the below validation Errors',
        { cssClass: 'alert-danger', timeout: 3000 });
      return;
    }
    this.client.email = this.editClientForm.get('email')?.value;
    this.client.firstName = this.editClientForm.get('firstName')?.value;
    this.client.lastName = this.editClientForm.get('lastName')?.value;
    this.client.balance = this.editClientForm.get('balance')?.value;
    this.client.phoneNo = this.editClientForm.get('phoneNo')?.value;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('client updated successfully', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);
  }

}
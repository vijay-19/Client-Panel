import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modals/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id!: string;
  client!: any;
  hasBalance: Boolean = false;
  showbalanceUpdateInput: boolean = false;

  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(data => {
      console.log(data);
      // if(data != null) {

      // }
      this.client = data;
      if (this.client.balance > 0) {
        this.hasBalance = true;
      }
    });
  }
  onDelete() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('client Deleted successfully', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.router.navigate(['/']);

  }

}


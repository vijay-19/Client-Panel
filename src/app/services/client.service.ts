import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClientDetailsComponent } from '../components/client-details/client-details.component';
import { Client } from '../modals/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client> | undefined;
  clientsDoc: AngularFirestoreDocument<Client> | undefined;
  clients: any;
  client: Observable<Client> | undefined;

  constructor(private afs: AngularFirestore) {
    // this.clientsCollection = this.afs.collection('clients', 
    // ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    this.clients = this.afs.collection('clients').valueChanges({ idField: 'id' });
    return this.clients;
  }

  addClient(client: Client) {
    this.afs.collection('clients').add(client);
  }

  getClient(id: string) {
    this.clientsDoc = this.afs.doc<Client>(`clients/${id}`);
    console.log(this.clientsDoc);
    return this.clientsDoc.valueChanges({ idField: 'id' });
  }

  updateClient(client: Client) {
    this.clientsDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientsDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientsDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientsDoc.delete()
  }

  //   getClients(): Observable<Client[]> { 
  //     return this.clients = this.afs.collection('clients').
  //       snapshotChanges().pipe(actions => {
  //   return actions.map(a => {
  //     const data = a.payload.doc.data();
  //     const id = a.payload.doc.id;
  //     return { id, ...data };
  //   });
  // });
  //   }
}

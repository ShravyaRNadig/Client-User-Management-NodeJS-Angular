import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: Client[] = [];
  currentClient: Client = { name: '', email: '', phone: '' };
  isEditMode = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  // Load all clients
  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  // Add or Update a client
  saveClient(form: NgForm): void {
    if (this.isEditMode) {
      // Update client
      this.clientService.updateClient(this.currentClient.id!, this.currentClient)
        .subscribe(() => {
          this.loadClients();
          this.resetForm(form);
        });
    } else {
      // Add new client
      this.clientService.addClient(this.currentClient)
        .subscribe(() => {
          this.loadClients();
          this.resetForm(form);
        });
    }
  }

  // Set current client for editing
  editClient(client: Client): void {
    this.isEditMode = true;
    this.currentClient = { ...client };
  }

  // Delete a client
  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadClients();
      });
    }
  }

  // Reset form
  resetForm(form: NgForm): void {
    form.reset();
    this.currentClient = { name: '', email: '', phone: '' };
    this.isEditMode = false;
  }
}

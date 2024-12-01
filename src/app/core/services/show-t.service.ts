import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
  
})
export class ShowTService {

  
  constructor(private messageService: MessageService) {}

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({severity, summary, detail});
  }

  clearMessages() {
    this.messageService.clear();
  }
}
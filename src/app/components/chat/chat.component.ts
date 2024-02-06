import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/interfaces/chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  message: string = '';
  userId: string = '';
  messageList: any[] = [];

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom('ABC')
    this.listener();
  }

  sendMessage() {
    const chatMessage: ChatMessage = {
      message: this.message,
      user: this.userId
    }

    this.chatService.sendMessage("ABC", chatMessage);
    this.message = '';
  }

  listener() {
    this.chatService.getMessage().subscribe(message => {
      this.messageList = message.map((item: ChatMessage) => ({
        ...item,
        _side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    })
  }

}

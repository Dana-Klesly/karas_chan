import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storeg/storage.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  heartphoto: string = '../img/1/23.png';
  handbook9: string = '../img/1/Employee Handbook9.png';
  handbook: string = '../img/1/Employee Handbook.png';
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const token = this.storageService.getItem('Token');
    this.isLoggedIn = !!token;
    this.username = this.storageService.getItem('username');
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Exemplo de importação direta
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Isso o torna um componente autônomo
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
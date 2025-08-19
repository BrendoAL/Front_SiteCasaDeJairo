import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Exemplo de importação direta

@Component({
  selector: 'app-home',
  standalone: true, // Isso o torna um componente autônomo
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
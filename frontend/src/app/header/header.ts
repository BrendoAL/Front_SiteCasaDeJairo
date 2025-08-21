import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {}

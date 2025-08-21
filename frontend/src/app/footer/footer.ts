import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // leva para o topo suavemente
  }

}


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nasenakosamnavanthu';
  constructor(private route : Router,private ActiveRoute : ActivatedRoute){

  }
  movePage(){
    if(this.route.url == '/donate'){
      this.route.navigate(['/list-donors']);
      return
    }
    if(this.route.url == '/list-donors'){
      this.route.navigate(['/donate']);
      return
    }

  }
}



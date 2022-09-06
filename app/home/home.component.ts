import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GitHubService } from '../github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title='';
  values: string | undefined;
  userName: string = "tektutorialshub"

  loading: boolean = false;
  errorMessage="";
  pname: any;
  states: any;
  lat: any;
  long: any;

  constructor(private githubservice: GitHubService) { }
 
  ngOnInit(): void{
   this.title="Postal code information finder";
  }
/*
  onKey(event: any) { // without type info
    this.values = event.target.value;
    

  }
  */
  Sendpin(){
    let resp='';
    
    const input = document.getElementById('message') as HTMLInputElement | null;

    if (input != null) {
  
    console.log(input.value); 
    this.values=input.value;
    }
    this.getRepos();
  }
  
  public getRepos() {
    this.loading = true;
    this.errorMessage = "";
    const input = document.getElementById('message') as HTMLInputElement | null;

    if (input != null) {
  
    console.log(input.value); 
    this.values=input.value;
    
    this.githubservice.getRepos(this.values)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received') 
          console.log(response);
          console.log(response.places[0]['place name']);
          console.log(response.places[0].state);
          console.log(response.places[0].latitude);
          console.log(response.places[0].longitude);
          this.pname=response.places[0]['place name'];
          this.states=response.places[0].state;
          this.lat=response.places[0].latitude;
          this.long=response.places[0].longitude;

        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        })
  }
  
  }
}

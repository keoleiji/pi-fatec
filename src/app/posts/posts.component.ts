import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4200/posts').subscribe(
      posts => console.log('')
    );
  }

}

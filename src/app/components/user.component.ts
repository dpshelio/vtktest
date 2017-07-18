import { Component } from '@angular/core';
import { PostService } from '../services/posts.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: "user.component.html",
    providers: [PostService]
})

export class UserComponent  {
    name: string;
    email: string;
    address: address;
    hobbies: string[];
    showHobbies: boolean;
    posts: Post[];

    constructor(private postService: PostService){

        console.log('constructor ran');
        this.name = 'My name';
        this.email = "test";
        this.address ={
            street: "my st",
            postcode: "N104"
        };
        this.hobbies = ['Rock&Roll', 'Dance']
        this.showHobbies = false;

        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        })
    }

    toggleHobbies(){

        this.showHobbies = ! this.showHobbies;

    }
}



interface address {
    street: string;
    postcode: string;
}
interface Post {
    id: number;
    title: string;
    body: string;
}

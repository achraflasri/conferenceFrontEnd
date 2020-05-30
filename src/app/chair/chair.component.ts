import { Component } from '@angular/core';


@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.scss']
})
export class ChairComponent {

  title = 'Conferences panel';
  links = [
    {path : '/', icon: 'home', title: 'Home'},
    {path : '/conferences', icon: 'work', title: 'Conferences'},
    {path : '/reviewers', icon: 'supervised_user_circle', title: 'Reviewers'},
    {path : '/propositions', icon: 'assignment_ind', title: 'propositions'}
  ];


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  private routeSubscription: Subscription | null = null;
  id!: number;

  constructor(private router: Router, private route: ActivatedRoute,){}
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id'];
    });
  }

  onLogout(): void {
    this.router.navigate(['/selectBanca']);
  }

}

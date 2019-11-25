import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userList: User[];
  spinner = false;
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;

  constructor(
    private api: Service,
    private url: UrlConfig,
    private router: Router) { }

  /* logout Temporary*/
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  /* get list */
  private getDataList(): void {
    this.generateGridColumn();
    this.spinner = true;
    this.api.getList(this.url.urlConfig().userList).subscribe(res => {
      if (res) {
        this.spinner = false;
        this.userList = res;
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Grid Action */
  getAction(event): void {
    console.log(event);
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Name',
        rowName: 'firstName',
      }, {
        colName: 'DOB',
        rowName: 'email',
      }, {
        colName: 'Gender',
        rowName: 'username',
      },
      {
        colName: 'Action',
        action: [
          {btnName: 'edit', btnClass: ''},
          {btnName: 'delete', btnClass: ''},
          {btnName: 'view', btnClass: ''}
        ],
      }
    ];
  }

  ngOnInit() {
    this.getDataList();
  }

}

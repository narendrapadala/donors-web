import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css'],
})
export class DonorsListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private authService: AuthServiceService,
    private route: Router
  ) {}
  loader: boolean = false;
  size: any = 6;
  page: any = 1;
  totalDonorList: any;
  referenced: any = 'Narendra_Padala';
  fundsByRef: any = 'Narendra_Padala';
  fundValue: any;
  pageList: any = [6, 10, 15, 20, 25, 30, 50, 70, 100];
  referList: any = [
    { name: 'ALL', value: '*' },
    { name: 'Narendra Padala', value: 'Narendra_Padala' },
    { name: 'Sunkari Sriram', value: 'Sunkari_Sriram' },
    { name: 'Bhaskar Gangipamula', value: 'Bhaskar_Gangipamula' },
    { name: 'Krishana Ungarala', value: 'Krishna_Ungarala' },
    { name: 'Kiran', value: 'Kiran' },
    { name: 'Kishore B', value: 'Kishore_B' },
    { name: 'NandaKishore Gajula', value: 'NandaKishore_Gajula' },
  ];

  ngOnInit(): void {
    this.getAllDonors(this.referenced);
    this.getFunds(this.fundsByRef);
  }

  getFunds(ref: any) {
    this.api.getFunds(ref).subscribe((val) => {
      this.fundValue = val;
    });
  }

  donorMemberCount: any;
  getAllDonors(reference: any) {
    this.loader = true;
    this.api.getDonors(reference, this.size, this.page - 1).subscribe(
      (val: any) => {
        this.loader = false;
        this.totalDonorList = val['content'];
        this.donorMemberCount = val['totalElements'];
      },
      () => {
        this.loader = false;
      }
    );
  }

  allMembers() {
    this.getAllDonors(this.referenced);
  }

  logout() {
    this.authService.setLogout(false);
    this.route.navigate(['login']);
  }

  onChangeFilter(val: any) {
    val = val.value;
    // console.log(val)
    this.referenced = val;
    this.page = 1;
    this.getAllDonors(this.referenced);
    this.getFunds(this.referenced);
  }

  onChangeFilterRecords(val: any) {
    val = val.value;
    this.page = 1;
    this.size = val;
    this.getAllDonors(this.referenced);
  }
}

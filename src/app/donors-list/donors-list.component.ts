import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {

  constructor(private api : ApiService) { }
  loader : boolean = false;
  size : any = 5;
  page : any = 1;
  totalDonorList : any;
  referenced : any = '*';

  referList : any = [{name : "ALL" , value : '*'},
                     {name :"Narendra Padala" , value : "Narendra_Padala"},
                     {name : "Sriram Sunkari",value : "Sriram_Sunkari"}]

  ngOnInit(): void {
    this.getAllDonors(this.referenced)
  }

  donorMemberCount :any;
  getAllDonors(reference:any){
    this.loader = true;
    this.api.getDonors(reference,this.size,this.page-1).subscribe((val:any)=>{
      // console.log(val)
      this.loader = false;
      this.totalDonorList = val['content'];
      this.donorMemberCount = val['totalElements'];
    },()=>{
      this.loader = false;
    })
  }


  allMembers(){
    this.getAllDonors(this.referenced)
  }


  onChangeFilter(val:any){
    val = val.value;
    // console.log(val)
    this.referenced = val;
    this.page = 1;
    this.getAllDonors(this.referenced)
  }

}

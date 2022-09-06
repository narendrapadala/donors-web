import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor() { }

  showSuccess(headermsg? : any,message? : any) {
    $.toast({
      heading: headermsg,
      text: message,
      showHideTransition: 'slide',
      icon: 'success'
   })
  }

  showError(headermsg : any,message : any){
    $.toast({
      heading: Error,
      text: message,
      showHideTransition: 'slide',
      icon: 'success'
   })
  }
}

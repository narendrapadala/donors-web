import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  DataUrl,
  DOC_ORIENTATION,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
import { TosterService } from '../toster.service';
import { AuthServiceService } from '../auth-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.css']
})
export class CreateDonorComponent implements OnInit {

  public imagePath:any;
  imageUloadType = false;
  fileToUpload: any = null;
  imgURL: any = null;
  loader : boolean = false;
  responseMsgShow : boolean = false;;
  constructor(private apiService : ApiService,private imageCompress: NgxImageCompressService,private tost : TosterService,private authService: AuthServiceService,private route : Router ) { }

  imgResultBeforeCompression: string = "";
  imgResultAfterCompression: string = "";

  ngOnInit(): void {
  }

  name : any;
  amount : any;
  city :any;
  reference : any = 'Narendra_Padala';
  payment : any = 'GooglePay';


  formatImg : any;
  handleFileInput(files: any) {
    files = files.target.files;
    // console.log(files)
    // this.fileToUpload = files.item(0);
    // var reader = new FileReader();
    // this.imagePath = files;

    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.imageUloadType = true;
    //   let img:any = reader.result;
    //   // console.log(img.replace(/^[^,]+, */, ''))
    //   // this.formatImg = img.replace(/^[^,]+, */, '');
    //   this.imgURL = reader.result;  
    // };


    this.imageCompress.uploadFile().then(({image, orientation}) => {
  
      this.imgResultBeforeCompression = image;
      // console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(this.imgURL, orientation, 50, 50) // 50% ratio, 50% quality
        .then(
          (compressedImage) => {
            this.imgResultAfterCompression = compressedImage;
            this.imgURL = this.imgResultAfterCompression;
            // console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
          }
        );
    });
  }

  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';
  fileExtension : any;
  compressFile() {
    return this.imageCompress.uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        this.imgResultBeforeCompress = image;
        // console.log(fileName.split('.').pop());
        this.fileExtension = fileName.split('.').pop();
        this.imageCompress.compressFile(image, orientation, 50, 50).then((result: DataUrl) => {
            this.imgResultAfterCompress = result;
            this.imgURL = this.imgResultAfterCompress;
            // console.log('Size in bytes is now:',this.imageCompress.byteCount(result));
          });
      });
  }

  logout(){
    this.authService.setLogout(false);
    this.route.navigate(['login'])
  }

  
  saveUserPaymentInfo(){
   
    if(this.amount == undefined || this.amount == ''){
      alert('Please enter donated amount!');
      return;
    }
    if(this.name == undefined || this.name == ''){
      alert('Please enter donor name!');
      return;
    }
    if(this.city == undefined || this.city == ''){
      alert('Please enter your city or village!');
      return;
    }
    if(this.reference == undefined || this.reference == ''){
      alert('Please select reference member!');
      return;
    }
    if(this.imgURL == null){
      alert('Please Upload Payment Screenshot!');
      return;
    }
    if(this.fileExtension != 'jpeg' && this.fileExtension != 'png' && this.fileExtension != 'gif' && this.fileExtension != 'jpg'){
      alert('Invalid File Type');
      return;
    }
    this.loader = true;
    let body = {
      "donor": this.name,
      "amount": this.amount,
      "payment": this.payment,
      "image": this.imgURL,
      "city": this.city,
      "reference": this.reference,
      "createdAt": new Date().getTime()
    }
    // console.log(body)

    this.apiService.donorCreate(body).subscribe(val=>{
      console.log(val)
      this.loader = true;
      this.responseMsgShow = true;
      setTimeout(()=>{
        this.responseMsgShow = false;
        this.loader = false;
        this.name = '';
        this.amount = '';
        this.city = '';
        this.imgResultAfterCompress = '';
      },4000)
    },()=>{
      this.responseMsgShow = false;
    })

    // this.apiService.postFile(this.fileToUpload).subscribe(
    //   (data:any) => {
    //     // do something, if upload success
    //     this.imgURL = data['response'];
       
    //   },
    //   (error) => {
    //     //console.log(error);
    //   });
  }

}

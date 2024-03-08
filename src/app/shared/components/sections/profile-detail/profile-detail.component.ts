import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { File } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { ImageCroppedEvent, LoadedImage  } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {
  @Input() pitems: any = [];  
  @Input() config: AppConfig = {};    
  @Input() current_user_profile: any;
  @Output() doActive: EventEmitter<any> = new EventEmitter();
  @Output() onSubscriptionSelected: EventEmitter<any> = new EventEmitter();
  imageUrl:string = './assets/img/manavatar.png';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  memberSubscription =  {
      "color": "#00FF00",
      "remainingDays": 365
  }
  bCropImg: boolean = false;
  constructor(
    private router: Router,
    private title: Title,
		private meta: Meta,
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,    
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService,
    private sanitizer: DomSanitizer
    ) {
      this.getProfile();
    }  
    
    ngOnInit(): void {
      //this.getNotificationStatus();
      this.getSubscription();
    }    

    //get the profile info
    async getProfile(){
      this.httpService.get('profile').then((response: any)=>{
        this.loaderService.setLoading(false);                                
        console.log('photo data', response);
        if(response.photo != null)
          this.imageUrl = response.photo;
        else
          this.imageUrl = "./assets/img/manavatar.png"; 

        console.log('image photo url initial here');
        console.log(response.photo);
      }).catch((error) => {
        this.alertService.alert('Error', error.message, 'error');
        this.loaderService.setLoading(false);  
        this.imageUrl = "./assets/img/manavatar.png";         
        //this.personalTrainings = [];                 
      });
    }

    //get the subscription data
    getSubscription(){     
        this.httpService.get('member/subscription').then((response: any)=>{          
          this.memberSubscription = response;
        }).catch((error) => {
          this.loaderService.setLoading(false);                 
          //this.personalTrainings = []; 
          this.alertService.alert('Error', error.message, 'error');
        });  
    }

    onImageSelected(event: any) {
      console.log('file uploaded ..', event.target.files);
      this.imageChangedEvent = event;
      this.bCropImg = true;
      if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];  
          console.log('file detailed data', event.target.files[0]);
          console.log('file detailed data', event.target.result);
          if (file && this.croppedImage!='') {
              const reader = new FileReader();              
              reader.onload = (e: any) => {     
                this.imageUrl = e.target.result;                
                const newFile: File = {
                    uri: this.imageUrl,
                    type: file.type,
                    name: file.name,
                    content: file
                };
              };
              reader.readAsDataURL(file);
              
              const formdata = new FormData();
              //formdata.append("photo", file);
              formdata.append("photo", this.dataURItoBlob(this.croppedImage));
              formdata.append("client_id", this.httpService.client_id.toString());
              // const formdata = {photo: file};

              this.loaderService.setLoading(true);   
              console.log('form data here', formdata);
              this.httpService.post('profile/image/update', formdata).then((response: any)=>{
                
                this.loaderService.setLoading(false);
                const title= "Success";
                const body = "Profile photo updated"; 
                this.alertService.alert(title, body, 'success');
                
              }).catch((error) => {
                this.loaderService.setLoading(false);
                this.imageUrl = "./assets/img/manavatar.png"; 
                this.alertService.alert('Error', error.message, 'error');      
              });             
          }         
          
      }
    }

    dataURItoBlob(dataURI: string) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
    
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
      console.log('cropped image here',this.croppedImage, 'cropped_image.png');
      console.log('cropped image here',event.blob);
      // event.blob can be used to upload the cropped image     

      const formdata = new FormData();
        //formdata.append("photo", file);
      formdata.append("photo", event.blob);
      formdata.append("client_id", this.httpService.client_id.toString());
      // const formdata = {photo: file};

      this.loaderService.setLoading(true);   
      console.log('form data here', formdata);
      this.httpService.post('profile/image/update', formdata).then((response: any)=>{
        
        this.loaderService.setLoading(false);
        const title= "Success";
        const body = "Profile photo updated"; 
        this.alertService.alert(title, body, 'success');
        this.bCropImg = false;
      }).catch((error) => {
        this.loaderService.setLoading(false);
        this.imageUrl = "./assets/img/manavatar.png"; 
        this.alertService.alert('Error', error.message, 'error');      
      });   
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
        console.log('show cropper', image);
      if (this.croppedImage!='') {
        const reader = new FileReader();              
        reader.onload = (e: any) => {     
          this.imageUrl = e.target.result;                
          
        };          
        
        const formdata = new FormData();
        //formdata.append("photo", file);
        formdata.append("photo", this.dataURItoBlob(this.croppedImage));
        formdata.append("client_id", this.httpService.client_id.toString());
        // const formdata = {photo: file};

        this.loaderService.setLoading(true);   
        console.log('form data here', formdata);
        this.httpService.post('profile/image/update', formdata).then((response: any)=>{
          
          this.loaderService.setLoading(false);
          const title= "Success";
          const body = "Profile photo updated"; 
          this.alertService.alert(title, body, 'success');
          
        }).catch((error) => {
          this.loaderService.setLoading(false);
          this.imageUrl = "./assets/img/manavatar.png"; 
          this.alertService.alert('Error', error.message, 'error');      
        });             
      } 
    } 
}

import {Component, Input, OnInit, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AppConfig } from 'src/app/shared/services/config/app.config';
import {Branch} from "src/app/shared/models";
import {GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() config: AppConfig = {};
  branches: Branch[] = [];
  isLangFlag: boolean = false;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  markerInfoContent = '';
  styles: any = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        { 
          color: '#d59563',
          visibility: 'off'
         }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948', visibility: 'off'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ];

  mapOptions = {
    styles: this.styles,
    mapTypeControl: false,
    streetViewControl: false
  };

  markerCenter: google.maps.LatLngLiteral = {
    lat: 24.6857408,
    lng: 46.7047453
  };
  
  marker = {
    position: {
      lat: 24.6857408,
      lng: 46.7047453
    },
    options: {
      draggable: true      
    },
    label: 'A'    
  };

  constructor(private httpService: HttpService, private alertService: AlertService) {
    
  }

  ngOnInit() {
    this.onFetchBranches().then(() => {            
    });
    console.log('config value==>', this.config.isArabic);
    this.isLangFlag = this.config.isArabic;
  }

  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event.latLng);
    this.marker.position =  event.latLng?.toJSON() || {lat: 24.6857408, lng: 46.7047453};
  }

  //Get the branch list
  async onFetchBranches(){    
    this.httpService.post('branches', {keyword: '', client_id: this.httpService.client_id}).then((response: any)=>{
      this.branches = response;      
      if(Object.keys(this.branches).length!==0){
        this.markerCenter = {
          lat: response[0].lat,
          lng:  response[0].lng
        }
      }
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  selectedBranchIndex = null;

  //Open the branch info
  openInfoWindow(marker: MapMarker, windowIndex: number) { 
    let curIdx = 0;
    this.infoWindowsView.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
        window.close();
      }
    });
  }  
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { AlertController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  GoogleMapOptions,
  Geocoder,
  GeocoderResult,
  ILatLng,
  GeocoderRequest
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  map: GoogleMap;
  address: any;
  options: GoogleMapOptions;
  request: GeocoderRequest;
  marker: Marker;
  myPosition: any;
  extra: any;
  myLat: any;
  myLng: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad() {
    

    this.extra = this.navParams.get('dataColonia');
    this.myLat = this.extra.colonia.lat;
    this.myLng = this.extra.colonia.lng;
    this.address = this.extra.colonia.nombre_colonia+", "+this.extra.municipio.nombre_municipio+", nuevo leon";
    console.log("EXTRA: "+this.address);
    this.loadMap();

  }
  
  loadMap() {

    let load = this.loadingCtrl.create({
      content:'Ubicando colonia...'
    });

    load.present();

    this.options= {
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        mapToolbar: true
      }
    };


    // Address -> latitude,longitude
    Geocoder.geocode({
      "address": this.address
    }).then((results: GeocoderResult[]) => {
      console.log(results);
  
      if (!results.length) {
        return null;
      }
  
      // Add a marker
      let marker: Marker = this.map.addMarkerSync({
        'position': results[0].position,
        'title':'Precios de la zona',
        'snippet':'Presiona el icono para consultar',
        'styles':{
                  'text-align': 'center',
                  'font-style': 'italic',
                  'font-weight': 'bold',
                  'color': 'primaryDark'
                },
          'animation': GoogleMapsAnimation.DROP
        
      });

      //nueva presicion
      if(this.myLat!=='0' && this.myLng!=='0'){
        let new_position: ILatLng = {
          lat: this.myLat,
          lng: this.myLng
        };

        this.toastCtrl.create({
          message:'Ubicando colonia, ubicacion exacta',
          position:'bottom',
          duration:2000  
        }).present();

        marker.setPosition(new_position);
      }
    
      this.map.addCircleSync({
        center: marker.getPosition(),
        radius: 500,
        fillColor: "rgba(5, 131, 84, 0.34)",
        strokeColor: "rgba(5, 131, 84, 0.98)",
        strokeWidth: 1
      });
      
      // Move to the position
      this.map.animateCamera({
        'target': marker.getPosition(),
        'zoom': 15
      }).then(() => {
        marker.showInfoWindow();
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          
          this.toastCtrl.create({
            message: 'rentohouse.com',
            position:'top',
            duration: 3000
          }).present();

          this.alertCtrl.create({
            title: 'Libro verde',
					  cssClass: 'data-colonia',
            subTitle: '<div class="colonia">Colonia: '+this.extra.colonia.nombre_colonia+'</div>'+'<div class="olonia">Uso: '+this.extra.colonia.uso_suelo+'</div>'+'<div class="colonia">Valor catastral: $ '+this.extra.colonia.valor_catastral+' MXN</div>'+'<div class="colonia">Tipo lote: '+this.extra.colonia.tipo_lote+'</div>'+'<div class="colonia">Precio bajo: $ '+this.extra.colonia.precio_bajo+' MXN</div>'+'<div class="colonia">Precio alto: $ '+this.extra.colonia.precio_alto+' MXN</div>',
            buttons: ['Ok']
          }).present();

        });

        load.dismiss();
      });
    });

    this.map = GoogleMaps.create('map_canvas', this.options);
  }
}

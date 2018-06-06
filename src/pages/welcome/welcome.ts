import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { FiltroPage } from '../filtro/filtro';
import { Subscription} from 'rxjs/Subscription';

import { MyProvider } from '../../providers/my/my';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  connected: Subscription;
  disconnected: Subscription;
  ping: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public network: Network, public API: MyProvider, public loadingCtrl: LoadingController) {
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  ionViewDidLoad(){
    
  }
  ionViewWillEnter(){
    
    this.connected = this.network.onConnect().subscribe(data => {

      this.toastCtrl.create({
        message: 'Conectado',
        duration: 3000
      }).present();
    }, error => console.error(error));

    this.disconnected = this.network.onDisconnect().subscribe(data => {

      this.toastCtrl.create({
        message: 'Active el WIFI o el uso de datos del equipo',
        duration: 3000
      }).present();
    }, error => console.error(error));

    console.log("Entre");
  }


  myPing(){
    let load = this.loadingCtrl.create({
      content:'Estableciendo conexión con el servidor...'
    });

    load.present();

    this.API.ping().then((data)=>{
      this.ping = data;

      if(this.ping[0].conexion){
        this.navCtrl.push(FiltroPage);
        load.dismiss();
      }else{
        this.myError();
        load.dismiss();
      }

    },(error)=>{
      console.log("Error "+error);
      load.dismiss();
    });

   
  }


  continuar(){
    this.myPing();
  }

  myError(){
    this.toastCtrl.create({
      message:'Se requiere que tenga acceso a internet para continuar',
      duration:3000,
      position:'top'
    }).present();
  }



}

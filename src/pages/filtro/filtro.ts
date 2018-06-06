import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';


import { MyProvider } from '../../providers/my/my';

/**
 * Generated class for the FiltroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html',
})
export class FiltroPage {

  estados: any;
  municipios: any;
  zonas: any;
  colonias: any;
  id_estado: any;
  id_municipio: any;
  id_zona: any;
  id_colonia: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: MyProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    let load = this.loadingCtrl.create({
      content:'Recuperando información de estados, espere un momento...'
    });

    load.present();

    this.api.getEstados().then((data)=>{
      this.estados = data;
      console.log("DATA "+data);

      if(this.estados[0].exito){
        if(this.estados[1].datos){
          this.estados.splice(0, 2);//xisten datos para mostrar
          this.id_estado = this.estados[0];
          this.buscarMunicipios(this.id_estado.id_estado);
        }else{
          this.toastCtrl.create({
            message: 'Sin estados para mostrar',
            duration: 3000,
            position: 'top'
          }).present();
        }
      }else{
        this.toastCtrl.create({
          message: 'Ocurrio un problema en el servidor! :(',
          duration: 3000,
          position: 'top'
        }).present();
      }

      
    },(error)=>{
      console.log("Error getmun "+error);
    });

    console.log('ionViewDidLoad FiltroPage');
    load.dismiss();
  }


  buscarMunicipios(id){
    let load = this.loadingCtrl.create({
      content:'Recuperando información de municipios, espere un momento...'
    });

    load.present();

    this.api.getMunicipios(id).then((data)=>{
      this.municipios = data;
      console.log("DATA "+data);

      if(this.municipios[0].exito){
        if(this.municipios[1].datos){
          this.municipios.splice(0, 2);//xisten datos para mostrar
          this.id_municipio = this.municipios[0];
          this.buscarZonas(this.id_municipio.id_municipio);
        }else{
          this.id_municipio = '';
          this.id_zona = '';
          this.id_colonia = '';
          this.toastCtrl.create({
            message: 'Sin municipios para mostrar',
            duration: 3000,
            position: 'top'
          }).present();
        }
      }else{
        this.toastCtrl.create({
          message: 'Ocurrio un problema en el servidor! :(',
          duration: 3000,
          position: 'top'
        }).present();
      }

      
    },(error)=>{
      console.log("Error getmun "+error);
    });

    load.dismiss();
  }

  buscarZonas(id){
    let load = this.loadingCtrl.create({
      content:'Recuperando Zonas, espere un momento...'
    });

    load.present();

    this.api.getZonas(id).then((data)=>{
      this.zonas = data;
      console.log("Zonas "+data);

      if(this.zonas[0].exito){
        if(this.zonas[1].datos){
          this.zonas.splice(0, 2);//xisten datos para mostrar
          this.id_zona = this.zonas[0];
          this.buscarColonias(this.id_zona.id_zona);
        }else{
          this.id_zona = '';
          this.id_colonia = '';
          this.toastCtrl.create({
            message: 'Municipio sin zonas registradas',
            duration: 3000,
            position: 'top'
          }).present();
        }
      }else{
        this.toastCtrl.create({
          message: 'Ocurrio un problema en el servidor! :(',
          duration: 3000,
          position: 'top'
        }).present();
      }

      
    },(error)=>{
      console.log("Error getzonas "+error);
    });

    load.dismiss();
  }

  buscarColonias(id){

    let load = this.loadingCtrl.create({
      content:'Recuperando colonias, espere un momento...'
    });

    load.present();

    this.api.getColonias(id).then((data)=>{
      this.colonias = data;
      console.log("Colonias "+data);

      if(this.colonias[0].exito){
        if(this.colonias[1].datos){
          this.colonias.splice(0, 2);//xisten datos para mostrar
          this.id_colonia = this.colonias[0];
        }else{
          this.id_colonia = '';
          this.toastCtrl.create({
            message: 'Zona sin colonias registradas',
            duration: 3000,
            position: 'top'
          }).present();
        }
      }else{
        this.toastCtrl.create({
          message: 'Ocurrio un problema en el servidor! :(',
          duration: 3000,
          position: 'top'
        }).present();
      }

      
    },(error)=>{
      console.log("Error getzonas "+error);
    });

    load.dismiss();
  }

  buscarInMap(){

    if(this.id_estado!=='' && this.id_municipio!=='' && this.id_zona!=='' && this.id_colonia!==''){
      this.navCtrl.push(HomePage,{dataColonia:{estado:this.id_estado, municipio:this.id_municipio,zona:this.id_zona,colonia:this.id_colonia}});
    }else{
      this.toastCtrl.create({
        message: 'No podemos realizar la busqueda en el mapa, asegurate de haber seleccionado -> estado, municipio, zona y colonia para poder continuar',
        duration: 10000,
        position: 'top'
      }).present();
    }
    
  }

}

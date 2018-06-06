import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the MyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyProvider {

  constructor(public http: HttpClient, public toastCtrl: ToastController) {
    console.log('Hello MyProvider Provider');
  }

  getEstados(){
    return new Promise(resolve=>{
      this.http.get('https://desarrolloqwerty-ampi.000webhostapp.com/API/request/get_estados.php').subscribe(data=>{
        resolve(data);
      }, err=>{
        console.log("Get municipios error: "+err);
      });
    });
  }

  getMunicipios(id){
    return new Promise(resolve=>{
      this.http.get('https://desarrolloqwerty-ampi.000webhostapp.com/API/request/get_municipios.php?estado='+id).subscribe(data=>{
        resolve(data);
      }, err=>{
        console.log("Get municipios error: "+err);
      });
    });
  }

  getZonas(id: String){
    return new Promise(resolve=>{
      this.http.get('https://desarrolloqwerty-ampi.000webhostapp.com/API/request/get_zonas.php?id='+id).subscribe(data=>{
        resolve(data);
      }, err=>{
        console.log("Get zonas error: "+err);
      });
    });
  }

  getColonias(id: String){
    return new Promise(resolve=>{
      this.http.get('https://desarrolloqwerty-ampi.000webhostapp.com/API/request/get_colonias.php?id='+id).subscribe(data=>{
        resolve(data);
      }, err=>{
        console.log("Get colonias error: "+err);
      });
    });
  }

  ping(){
    return new Promise(resolve=>{
      this.http.get('https://desarrolloqwerty-ampi.000webhostapp.com/API/request/ping.php').subscribe(data=>{
        resolve(data);
      }, err=>{
        this.toastCtrl.create({
          message:"No tienes acceso a internet, verifica tu conexión. Error: "+err.status,
          duration:3000
        }).present(); 
      });
    });
  }



}

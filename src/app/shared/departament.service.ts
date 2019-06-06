import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import * as _ from "lodash"; 

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  departamentList: AngularFireList<any>;
  array = [];

  constructor(public firebase: AngularFireDatabase) { 
    this.departamentList = this.firebase.list('departaments');
    this.departamentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key, 
            ... item.payload.val()
          };
        });
      }
    );
  } //end of constructor

  getDepartamentName($key){
    if($key == 0){
      return "";
    }else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }

  }

}

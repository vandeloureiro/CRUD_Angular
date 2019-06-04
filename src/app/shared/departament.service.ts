import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

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

  }

}

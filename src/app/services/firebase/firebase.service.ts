import { Injectable, inject } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { Database, get } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getDatabase, ref, onValue, child } from "firebase/database";
import { environment } from '../../environments/environments';
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1099031411.
import { of } from 'rxjs';

// Initialize Firebase
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore)
  driversCollection = collection(this.firestore, 'drivers')
  // private database = inject(AngularFireDatabase);
  database = getDatabase(initializeApp(environment.firebase));
  drivers: any;

  constructor() {
  }

  getDrivers() {
    const starCountRef = ref(this.database, 'drivers');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.drivers = data
      console.log(data);
    });
    // return collectionData(this.driversCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getDriversList() {
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `drivers`)).then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject("No data available");
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }


}

import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  firebaseService = inject(FirebaseService);
  drivers: any;
  min = 0;
  max = 20;

  ngOnInit() {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:130547740.
    this.getDrivers();
  }

  async getDrivers() {
    await this.firebaseService.getDriversList().then((drivers: any) => {
      this.drivers = drivers
    })
    this.sortDrivers()
    console.log(this.drivers)
  }

  sortDrivers() {
    this.drivers.sort((a: any, b: any) => {
      return b.dob.localeCompare(a.dob)
    })
  }
  
  prevPage() {
    this.max = this.min
    this.min = this.min - 20
    this.sortDrivers()
  }

  nextPage() {
    this.min = this.max
    this.max = this.max + 20
    this.sortDrivers()
  }
}

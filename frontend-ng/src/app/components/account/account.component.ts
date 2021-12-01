import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { RocketService } from 'src/app/services/rocket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  bookings: any;
  constructor(private user: UserService, private rocket: RocketService, private booking: BookingService) { }

  ngOnInit(): void {
    this.user.getUserBookings(localStorage.getItem('token')).subscribe((data) => {
      this.bookings = data;
      for (let booking of this.bookings) {
        this.rocket.getRocketById(booking['flight_id']).subscribe((data) => {
          booking['flight'] = data;
        });
      }
    });
  }

  getFullDate(flight: any) {
    return this.user.getFullDate(flight.departure_date, flight.departure_time);
  }

  updateBooking(booking_id: string) {

  }

  cancelBooking(booking_id: string) {
    this.booking.cancelBooking(booking_id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  clicker() {
    console.log(this.bookings);
  }

}

import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
//  gives access to current route and ts parameters. It is service so we inject it by making a constructor
import { RentalService} from '../shared/rental.service';
import { Rental } from '../rental.model';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  rental : Rental;
  constructor(private route: ActivatedRoute, private rentalService : RentalService) {}

  ngOnInit() {
   // this.rental = new Rental();
    this.route.params.subscribe(
      (params) => {
        this.getRentalDetail(params['rentalId']);
      });
  }
  //  function written after ngOnInit

  getRentalDetail(rentalId : number) {
    this.rentalService.getRentalByID(rentalId).subscribe(
      (rentalDetail : Rental) => {
        this.rental = rentalDetail;
       // console.log(this.rental);
      })

    }

}

import { Component, OnInit, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Rental } from '../../rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService} from '../../../common/service/helper.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{ BookingService} from '../../../booking/shared/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';


@Component({
  encapsulation : ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  daterange: any = {};
  bookedOutDates: any[] = [];
  newBooking : Booking;
  modalRef: any
  errors: any[]= [] ;

  @Input() rental : Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;
  
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  options: any = {
    locale: { format: Booking.DATE_FORMAT},
    alwaysShowCalendars: false,
    autoUpdateInput : false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDate.bind(this)
    // bind is used to pass 'this' to a regular function call
    };

  constructor(private helper : HelperService,
              private modalService : NgbModal,
              private bookingService : BookingService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              ) 
              { 
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.getBookedOutDates();
    this.newBooking = new Booking();
    this.picker.datePicker;
  }

  private checkForInvalidDate(date){
    return this.bookedOutDates.includes(this.helper.formatBookingdate(date))||(date.diff(moment(),'days')< 0);
  }

  private getBookedOutDates(){
    const bookings: Booking[] = this.rental.bookings;
    if(bookings && bookings.length >0 ){
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
        // console.log(this.bookedOutDates);
      });
    }
  }
  private addBookedOutDates(bookingData: any){
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt , bookingData.endAt);
    this.bookedOutDates.push(...dateRange);

  }
  private resetDatePicker(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');

  }
  openConfirmModal(content){
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking(){
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) =>{
        console.log(bookingData);
        this.addBookedOutDates(bookingData)
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking created.Check your booking detail in Manage section', 'Success!');
      
      },
      (errorResponse) =>{
        this.errors = errorResponse.error;
        console.log(errorResponse.error.detail);
      },
    )
  }

  selectedDate(value: any, datepicker?: any) {
  // this is the date the iser selected
  // console.log(value);

  // any object can be passed to the selected event and it will be passed back here
 // datepicker.start = value.start;
  //datepicker.end = value.end;
  this.options.autoUpdateInput = true;
  this.newBooking.startAt = this.helper.formatBookingdate(value.start);
  this.newBooking.endAt = this.helper.formatBookingdate(value.end);
  this.newBooking.days = value.end.diff(value.start, 'days');
  this.newBooking.totalPrice =  this.newBooking.days * this.rental.dailyRate ;

  // or manupulat your own internal property
  this.daterange.start = value.start;
  this.daterange.end = value.end;
  this.daterange.label = value.label;
}

}

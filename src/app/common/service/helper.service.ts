import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model';

@Injectable()
export class HelperService {

    private getRangeOfDates(startAt, endAt, dateFormat) {
        const tempDates = [];

        const mEndAt = moment(endAt);
        let mStartAt = moment(startAt);
        
        while (mStartAt <= mEndAt){
            tempDates.push(mStartAt.format(dateFormat));
            mStartAt= mStartAt.add(1,'day');
        }
        return tempDates;
    }

    private formatDate(date, dateFormat) {
        return moment(date).format(dateFormat);
    }

    public formatBookingdate(date){
        return this.formatDate(date, Booking.DATE_FORMAT);
    }

    public getBookingRangeOfDates(startAt, endAt) {
       return this.getRangeOfDates(startAt, endAt , Booking.DATE_FORMAT);
    }
}
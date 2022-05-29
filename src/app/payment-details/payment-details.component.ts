import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshlist();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: Number) {
    if (confirm("Are you sure to Delete this Record?")) {
      this.service.deletePaymentDetail(id)
        .subscribe(
          res => {
            this.service.refreshlist();
            this.toastr.error("Deleted Successfully", 'Payment Detail Register');
          },
          err => {
            console.log(err);
          }
        )
      this.service.refreshlist();
    }

  }

}

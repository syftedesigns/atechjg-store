import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../../../services/local/storage.service';
import { GlobalService } from '../../../../services/global/global.service';
import { SessionClass } from '../../../classes/session.class';

@Component({
  selector: 'app-patners',
  templateUrl: './patners.component.html',
  styleUrls: ['./patners.component.css']
})
export class PatnersComponent implements OnInit {
  qtyRequired: number = 1;
  productInfo: any = '';
  checked: boolean = false;
  sessionId: SessionClass = new SessionClass();

  constructor(public dialogRef: MatDialogRef<PatnersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private session: StorageService,
              private global: GlobalService) {
                this.qtyRequired = data.moq;
                this.productInfo = data.data;
              }

  ngOnInit() {
    setTimeout(() => {
      if (this.session.CurrentSession !== null) {
        this.sessionId = new SessionClass(this.session.CurrentSession.fullname, this.session.CurrentSession.email,
          this.session.CurrentSession.country, this.session.CurrentSession.phone);
        this.checked = true;
      }
    }, 500);
  }

  async patnerFormSend(formData: NgForm) {
    if (formData.invalid) {
      throw new Error('Form invalid');
    }
    // Verificamos si quiere guardar la data
    const valueOf = formData.value;
    if ((valueOf.checkbox !== undefined) && (valueOf.checkbox !== null) && (valueOf.checkbox !== '') && (valueOf.checkbox)) {
      const objectSession = {
        fullname: valueOf.fullname,
        email: valueOf.email,
        country: valueOf.country,
        phone: valueOf.phone
      };
      if (await this.session.SaveCustomerOnCookie(JSON.stringify(objectSession))) {
        this.global.OpenSnackBar('Hemos guardado tu sesión');
        this.session.CurrentSession = await this.session.LoadCustomer();
        this.dialogRef.close();
      }
    } else {
      if (await this.session.ClearCookie()) {
        console.log('eliminamos las cookies');
      }
    }
  }
}

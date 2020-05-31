import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropositionService } from 'src/app/proposition.service';
import { FormControl, Validators } from '@angular/forms';

interface Proposition {
  id?: number;
  titre?: string;
  path?: string;
  status?: boolean;
}

@Component({
  selector: 'app-update-proposition',
  templateUrl: './update-proposition.component.html',
  styleUrls: ['./update-proposition.component.css']
})
export class UpdatePropositionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatePropositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public propositionService: PropositionService) { }

  proposition: Proposition;
  formControl = new FormControl('', [
    Validators.required
  ]);


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }


  ngOnInit(): void {
    this.proposition = this.data.proposition
  }
  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit() {
    this.propositionService.updateProposition(this.data.proposition, this.data.idProp);
  }

}

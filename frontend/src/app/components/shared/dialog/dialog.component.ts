import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
    selector: "app-dialog",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.css"],
})

export class DialogComponent {

    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

   ngOnInit(): void {}
}
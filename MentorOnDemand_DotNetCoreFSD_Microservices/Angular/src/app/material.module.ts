import { NgModule } from '@angular/core';
import { MatTabsModule, MatNativeDateModule, MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatProgressBarModule, MatSortModule, MatTableModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [
        MatTabsModule,
        MatDividerModule,
        MatSliderModule,
        MatSelectModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule
    ],
    exports: [
        MatTabsModule,
        MatDividerModule,
        MatSliderModule,
        MatSelectModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule
    ]
})

export class MaterialModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatSelectModule,
        MatListModule,
        MatTooltipModule,
        MatChipsModule
    ]
})
export class OtherComponentsMaterialModule { }
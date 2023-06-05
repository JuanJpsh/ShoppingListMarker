import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatSelectModule,
        MatListModule,
        MatTooltipModule
    ]
})
export class OtherComponentsMaterialModule { }
import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './date-time-format/date-time-format';
import { SearchPipe } from './search/search';
import { SortPipe } from './sort/sort';
@NgModule({
	declarations: [DateTimeFormatPipe,
    SearchPipe,
    SortPipe],
	imports: [],
	exports: [DateTimeFormatPipe,
    SearchPipe,
    SortPipe]
})
export class PipesModule {}

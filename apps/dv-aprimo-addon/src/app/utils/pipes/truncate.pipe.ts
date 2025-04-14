import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true,
})
export class TruncatePipe implements PipeTransform {

    transform(value = '', limit = 40, ellipsis = '...'): string {
        return value.length > limit ? value.substring(0, limit) + ellipsis : value;
    }
}

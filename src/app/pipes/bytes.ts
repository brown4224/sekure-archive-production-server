import { Pipe, PipeTransform } from '@angular/core';

const KIBI: number = 2 ** 10;
const MEBI: number = 2 ** 20;
const GIBI: number = 2 ** 30;
const TEBI: number = 2 ** 40;

/** A pipe that transforms bytes to human-readable sizes (e.g., 4.03 GiB). */
@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        let bytes = parseInt(value);
        if (bytes >= TEBI) {
            return `${(bytes / TEBI).toPrecision(3)} TiB`;
        } else if (bytes >= GIBI) {
            return `${(bytes / GIBI).toPrecision(3)} GiB`;
        } else if (bytes >= MEBI) {
            return `${(bytes / MEBI).toPrecision(3)} MiB`;
        } else if (bytes >= KIBI) {
            return `${(bytes / KIBI).toPrecision(3)} KiB`;
        } else {
            return `${bytes} B`;
        }
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(name: string, length: number = 2, connector: string = ""): string {
    return this.toShortName(name, length, connector);
  }

  private toShortName(name: string, length: number, connector: string): string {
    return name && name.length > 0
      ? name
        .split(/[\s,\/]+/)
        .slice(0, length)
        .map((value) => this.toShortCharacter(value))
        .join(connector)
      : "";
  }

  private toShortCharacter(value: string): string {
    return value && value.length > 0
      ? value[0].toUpperCase()
      : "";
  }
}

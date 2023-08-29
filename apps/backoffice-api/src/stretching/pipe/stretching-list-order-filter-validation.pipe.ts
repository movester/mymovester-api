import { BadRequestException, PipeTransform } from '@nestjs/common';
import { StretchingListOrderFilter } from '@app/common/enum';

// Not used.
export class StretchingListOrderFilterValidationPipe implements PipeTransform {
  readonly orderFilterOptions = [
    StretchingListOrderFilter.RECENT,
    StretchingListOrderFilter.POPULAR,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid) {
      throw new BadRequestException(`${value} ins't in the orderFilter`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.orderFilterOptions.indexOf(status);
    return index !== -1;
  }
}

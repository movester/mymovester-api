// import { BadRequestException, PipeTransform } from '@nestjs/common';
// import { StretchingStatus } from 'src/common/enum';

// export class StretchingStatusValidationPipe implements PipeTransform {
//   readonly StatusOptions = [StretchingStatus.PUBLIC, StretchingStatus.PRIVATE];

//   transform(value: any) {
//     value = value.toUpperCase();

//     if (!this.isStatusValid) {
//       throw new BadRequestException(`${value} ins't in the status`);
//     }

//     return value;
//   }

//   private isStatusValid(status: any) {
//     const index = this.StatusOptions.indexOf(status);
//     return index !== -1;
//   }
// }

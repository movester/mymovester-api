import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admin.model';

@Controller('admins')
export class AdminsController {
    // 접근 제한자를 생성자 파라미터에 선언시, 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됨
    constructor(private adminsService: AdminsService){
    }

    @Get()
    getAdmins(): Admin[] {
        return this.adminsService.getAdmins();
    }

    @Post()
    createAdmin(@Body('name') name: string,
                @Body('email') email: string): Admin {
        return this.adminsService.createAdmin(name, email);

    }
}

import { Injectable } from '@nestjs/common';
import { Admin, AdminStatus } from './admin.model';
import { v1 as uuid } from 'uuid';

// 모듈간의 재사용성을 위한 어노테이션: DI > 이 인스턴스는 애플리케이션 전체에서 사용될 수 있다.
@Injectable()
export class AdminsService {
    private admins: Admin[] = [];

    getAdmins(): Admin[] {
        return this.admins;
    }

    createAdmin(name: string, email: string): Admin {
        const admin: Admin = {
            id: uuid(),
            email,
            name,
            status: AdminStatus.PUBLIC
        }

        this.admins = [...this.admins, admin];
        return admin;
    }
}


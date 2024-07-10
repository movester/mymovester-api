import { Gender, SocialType } from '@app/common';
import { Column, Entity } from 'typeorm';
import { BaseEntityClass } from '../../base-entity.entity';

@Entity('user')
export class User extends BaseEntityClass {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    comment: '이메일',
  })
  email: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 50,
    comment: '닉네임',
  })
  nickName: string;

  @Column({
    name: 'social_type',
    type: 'varchar',
    length: 50,
    comment: '소셜타입',
  })
  socialType: SocialType;

  @Column({
    name: 'social_uid',
    type: 'varchar',
    length: 255,
    comment: '소셜 uid',
  })
  socialUid: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 45,
    comment: '핸드폰 번호',
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'birth_at',
    type: 'timestamp',
    comment: '생년월일',
    nullable: false,
  })
  birthAt: Date;

  @Column({
    name: 'gender',
    type: 'varchar',
    length: 45,
    comment: '성별',
    nullable: false,
  })
  gender: Gender;

  @Column({
    name: 'profile_url',
    type: 'varchar',
    length: 255,
    comment: '회원프로필 이미지 URL',
    nullable: true,
  })
  profileUrl: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'is_term_agreed',
    type: 'boolean',
    nullable: true,
    comment: '이용약관 동의 여부',
  })
  isTermAgreed: boolean;

  @Column({
    name: 'is_privacy_policy_agreed',
    type: 'boolean',
    nullable: true,
    comment: '개인정보 동의 여부',
  })
  isPrivacyPolicyAgreed: boolean;

  @Column({
    name: 'is_marketing_agreed',
    type: 'boolean',
    nullable: true,
    comment: '마케팅 수신 동의 여부',
  })
  isMarketingAgreed: boolean;
}

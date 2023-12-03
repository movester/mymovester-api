export enum StretchingMainCategoryType {
  UPPER_BODY = 'UPPER_BODY',
  LOWER_BODY = 'LOWER_BODY',
}

export enum StretchingSubCategoryType {
  NECK = 'NECK', // 목/가슴/어깨
  ARM = 'ARM', // 팔/손/손목
  BACK = 'BACK', // 등/몸통
  HIP_JOINT = 'HIP_JOINT', // 고관절/둔군
  CALF = 'CALF', // 종아리/발목/발
  KNEE = 'KNEE', // 무릎/허벅지
}

export enum StretchingEffectType {
  RELIEF_PAIN = 'RELIEF_PAIN', // 통증완화
  IMPROVE_POSTURE = 'IMPROVE_POSTURE', // 자세개선
  RELAX_MUSCLE = 'RELAX_MUSCLE', // 근육이완
  BLOOD_CIRCULATION = 'BLOOD_CIRCULATION', // 혈액순환
  RELIEF_TURTLE_NECK = 'RELIEF_TURTLE_NECK', // 거북목 완화
  RELIEF_ROUND_SHOULDER = 'RELIEF_ROUND_SHOULDER', // 라운드숄더 완화
}

export enum StretchingListOrderFilter {
  RECENT = 'RECENT',
  POPULAR = 'POPULAR',
  VIEW = 'VIEW',
}

export enum SocialType {
  KAKAO = 'KAKAO',
}

export enum Gender {
  UNKNOWN = 'UNKNOWN',
  FEMAIL = 'FEMAIL',
  MAIL = 'MAIL',
}

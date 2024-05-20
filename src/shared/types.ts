export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Status {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
}

export enum SchoolTerm {
  TERM_I = 'term_i',
  TERM_II = 'term_ii',
  TERM_III = 'term_iii',
}

export enum SessionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum Banks {
  ACCESS = 'access',
  GUARANTY_TRUST = 'guaranty_trust',
  FIRST = 'first',
}

export enum AccountStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export type IsUniqueConstraintInput = {
  tableName: string;
  column: string;
};

export enum ResultStatusEnum {
  APPROVED = 'approved',
  PROCESSING = 'processing',
}

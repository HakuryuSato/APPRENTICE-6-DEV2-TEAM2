export interface UserStatus {
  userId: string; // uuid
  userName: string;
  isReady: boolean;
  votedCount?:number; // 該当ユーザーに投票された数,オプショナルのため使用時は存在チェック必須
}


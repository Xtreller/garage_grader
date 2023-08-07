import { User } from "./user.interface";

export interface Log {
  id?: number;
  user_id: number;
  content: string,
  user?: User
}

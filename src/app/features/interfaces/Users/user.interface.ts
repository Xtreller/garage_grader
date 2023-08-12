import { Role } from "src/app/core/interfaces/Auth/role.interface";
import { Review } from "../Reviews/review.interface";
import { Image } from "src/app/shared/interfaces/Images/image";

export interface User{
  id:number;
  email:string,
  name:string,
  role:Role,
  phone:string,
  password?:string,
  picture?:Image,
  favorites?:any[],
  reviews?:number
}

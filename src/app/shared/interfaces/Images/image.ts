export interface Image {
  id?: number,
  original_name:string,
  path: string,
  related_id:number,
  type:'content'| 'profile' | 'cover' | 'user'
}

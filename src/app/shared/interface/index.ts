export interface TabItem {
  icon: string;
  label: string;
  id: string;
  passed:boolean;
}
export interface ClubItem {
  name: string;
  address: string;
}
export interface File {
  uri: string;
  name?: string;
  size?: number;
  type: string;
  extension?: string;
  content?: ArrayBuffer;
}
export interface SubscriptionItem {
  id:number;
  cycle: number;
  price: number;
  description: string;
  currency: string;
  _per: string;
}
export interface PersonalTrainingItem {
  id:number;
  shares: string;
  _per: string;
  price: number;
  description: string;
  currency: string;
}
export interface Member {
  id: number;
  name: string;
}

export interface Branch {
  id: number;
  name_ar: string;
  name_en: string;
  address1: string;
  address2 : string;
  city_id: number ;
  phone: string;
  branch_category:string;
  branch_capacity: number;
  startup_date: string;
  email: string;
  lat: number;
  lng: number;
  location_type:string;
}

export interface Lang {
  code: string;
  country: string;
  icon: string;
}

export interface Notification {
  id: string;
  english_title: string;
  arabic_title: string;
  english_description: string;
  arabic_description: string;
  created_at: string;
  type: string;
  icon: string;
  arabic_created_at: string;
  english_created_at: string;
}
export interface Invoice {
  created_at: string;
  id:number;
  amount_after_vat: number;
  amount: number;
  payment_way: string;
  status: string;
  vat_amount: number;
  name: string;
}
export interface SubscriptionSession {
  id:number;
  title: string;
  start_date:string;
  expire_date:string;
  price:number;
  status:boolean;
  banner:string;
}
export interface TimeSession {
  id:number;
  class_name:string;
  trainer_name:string;
  branch_name:string;
  time:string;
  count: number;
  photo: string;
}
export interface AppointmentItem {
  id:number;
  class_name:string;
  trainer_name:string;
  date:string;
  time:string;
  status: string;
  banner: string;
}

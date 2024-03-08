
export class User {
  id?: number ;
  password?: string;
  email?: string = '';
  mobile?: string = '';
  national_id?: string = '';
  preferred_language?: string = '';
  remember_token?: string= '';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  gender?: string = '';
  channel?: string = '';
  photo?: string = '';
  member_since?: void;
  referred_by?: void ;
  arabic_name?: string = '';
  english_name?: string = '';
  first_name?: string = '';
  last_name?: string = '';
  dob?: Date;
  organization_id?: void;
  member_type?: string = '';
  client_id?: number;
  default_branch?: number;
  parent_mobile?: string="";
  parent_name?: string="";
  referral_code?: string="";
  fcm_token?: string="";
  token?: string="";
  media?: [];
  subscription_day?: Date;
  promotional_code?: string;
}

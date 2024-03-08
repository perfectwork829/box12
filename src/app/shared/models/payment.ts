
export class Payment {
  containerID? : string;
  gateway? : {
    publicKey? : string;
    language? : string;
    contactInfo? : boolean;
    supportedCurrencies? : string;
    supportedPaymentMethods? : string;
    saveCardOption? : boolean;
    customerCards? : boolean;
    notifications? : string;
    backgroundImg?: {
      url? : string;
      opacity? : string;
    },
    labels?:{
      cardNumber? : string;
      expirationDate? : string;
      cvv? : string;
      cardHolder? : string;
      actionButton? : string;
    },
    style?: {
      base: {
        color? : string;
        lineHeight? : string;
        fontFamily? : string;
        fontSmoothing? : string;
        fontSize? : string;
        '::placeholder'?: {
          color? : string;
          fontSize? : string;
        }
      },
      invalid?: {
        color? : string;
        iconColor? : string;
      }
    }
  };
  customer? : {
    id? : string;
    first_name? : string;
    middle_name? : string;
    last_name? : string;
    email? : string;
    phone?: {
      country_code? : string;
      number? : string;
    }
  };
  order? : {
    amount? : number;
    currency? : string;
    items?: PaymentOrderItem[];
    shipping? : string;
    taxes? : string;
  };
  transaction? : {
    mode? : string;
    charge?:{
      saveCard? : boolean;
      threeDSecure? : boolean;
      description? : string;
      statement_descriptor? : string;
      reference?:{
        transaction? : string;
        order? : string;
      },
      metadata? : object;
      receipt?:{
        email? : boolean;
        sms? : boolean;
      },
      redirect? : string;
      post? : string;
    }
  }
}


export class PaymentOrderItem {
  id?: number;
  name? : string;
  description? : string;
  quantity? : string;
  amount_per_unit? : string;
  discount?: {
    type? : string;
    value? : string;
  };
  total_amount? : string;
}


import { environment } from "src/environments/environment"
import { Payment } from 'src/app/shared/models';

export const PaymentConfiguration: Payment = {
	containerID : "goSell-container",
	gateway : {
		publicKey: environment.paymentKey,
		language:"en",
		contactInfo:true,
		supportedCurrencies:"all",
		supportedPaymentMethods: "all",
		saveCardOption:false,
		customerCards: true,
		notifications:'standard',
		backgroundImg: {
			url: 'imgURL',
			opacity: '0.5'
		},
		labels:{
			cardNumber:"Card Number",
			expirationDate:"MM/YY",
			cvv:"CVV",
			cardHolder:"Name on Card",
			actionButton:"Pay"
		},
		style: {
			base: {
				color: '#535353',
				lineHeight: '18px',
				fontFamily: 'sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: 'rgba(0, 0, 0, 0.26)',
					fontSize:'15px'
				}
			},
			invalid: {
				color: 'red',
				iconColor: '#fa755a '
			}
		}
	},
	customer : {
		id:"",
		first_name: "",
		middle_name: "",
		last_name: "",
		email: "",
		phone: {
			country_code: "965",
			number: "99999999"
		}
	},
	order : {
		amount: 100,
		currency:"SAR",
		items:[{
			id:1,
			name:'item1',
			description: 'item1 desc',
			quantity:'x1',
			amount_per_unit:'KD00.000',
			discount: {
				type: 'P',
				value: '10%'
			},
			total_amount: 'KD000.000'
		}],
		shipping:null,
		taxes: null
	},
	transaction : {
		mode: 'charge',
		charge:{
			saveCard: true,
			threeDSecure: true,
			description: "Test Description",
			statement_descriptor: "Statement Descriptor",
			reference:{
				transaction: "txn_0001",
				order: "ord_0001"
			},
			metadata:{},
			receipt:{
				email: true,
				sms: true
			},
			redirect: environment.front + "product",
			post: null,
		}
	}
}

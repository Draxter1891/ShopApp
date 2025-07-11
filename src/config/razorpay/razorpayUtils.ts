import RazorpayCheckout from 'react-native-razorpay';

export const startPayment = ({
  amount,
  currency = 'INR',
  name,
  email,
  // contact,
  description = 'Your Purchase',
}: {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  // contact: string;
  description?: string;
}) => {
  const options: any = {
    description,
    image: 'https://drive.google.com/uc?export=view&id=1xQLIg-QAQyeauAAXBZ0YeUEn7fMS9jAk',
    currency,
    key: 'rzp_test_928yd8fXq9Ph5E',
    amount: amount * 100,
    name,
    order_id: null,
    prefill: {
      email,
      // contact,         
      name,
    },
    theme: { color: '#3399cc' },
  };

  return RazorpayCheckout.open(options);
};
                                                                                                                                    
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
    image: 'https://res.cloudinary.com/ddj0ypazu/image/upload/v1752393607/play_store_512_iehxdi.png',
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
                                                                                                                                    
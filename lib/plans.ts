export interface Plan {
  id: 'A' | 'B' | 'C';
  name: string;
  price: number;
  commission: number;
  companyCut: number;
  description: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: 'A',
    name: 'Plan A',
    price: 3000,
    commission: 2000,
    companyCut: 1000,
    description: 'Basic support and tracking for individuals.',
    features: [
      'Basic Back Supporter',
      'Monthly Health Check-in',
      'Email Support',
    ],
  },
  {
    id: 'B',
    name: 'Plan B',
    price: 5000,
    commission: 3500,
    companyCut: 1500,
    description: 'Enhanced support with more frequent monitoring.',
    features: [
      'Advanced Back Supporter',
      'Bi-Weekly Health Check-in',
      'Priority Email Support',
      'Access to Wellness Webinars',
    ],
  },
  {
    id: 'C',
    name: 'Plan C',
    price: 8000,
    commission: 5500,
    companyCut: 2500,
    description: 'Premium support with personalized care.',
    features: [
      'Premium Back Supporter',
      'Weekly Health Check-in',
      '24/7 Phone & Email Support',
      'Access to Wellness Webinars',
      'Personalized Health Plan',
    ],
  },
]; 
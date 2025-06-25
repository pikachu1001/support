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
    name: 'プランA',
    price: 3000,
    commission: 2000,
    companyCut: 1000,
    description: '個人のための基本的なサポートと追跡。',
    features: [
      'ベーシック腰サポーター',
      '月次健康チェックイン',
      'メールサポート',
    ],
  },
  {
    id: 'B',
    name: 'プランB',
    price: 4000,
    commission: 2500,
    companyCut: 1500,
    description: 'より頻繁なモニタリングによる強化されたサポート。',
    features: [
      'アドバンス腰サポーター',
      '隔週の健康チェックイン',
      '優先メールサポート',
      'ウェルネスウェビナーへのアクセス',
    ],
  },
  {
    id: 'C',
    name: 'プランC',
    price: 5000,
    commission: 3000,
    companyCut: 2000,
    description: '個別ケア付きのプレミアムサポート。',
    features: [
      'プレミアム腰サポーター',
      '週次健康チェックイン',
      '24/7 電話 & メールサポート',
      'ウェルネスウェビナーへのアクセス',
      '個別健康プラン',
    ],
  },
];

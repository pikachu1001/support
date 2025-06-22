import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getFirestore, doc, setDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { plans, Plan } from '../../lib/plans';

export default function PatientSubscription() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = async (plan: Plan) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push('/patient/login');
      return;
    }

    setIsLoading(true);
    setSelectedPlan(plan);
    console.log('Selected plan:', plan);
    console.log('User:', user);

    try {
      const db = getFirestore();
      
      // 1. Create a new subscription document in 'subscriptions' collection
      const subscriptionRef = doc(collection(db, 'subscriptions'));
      await setDoc(subscriptionRef, {
        id: subscriptionRef.id,
        userId: user.uid,
        planId: plan.id,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // 2. Update the patient's document in 'patients' collection
      const patientRef = doc(db, 'patients', user.uid);
      await updateDoc(patientRef, {
        subscriptionId: subscriptionRef.id,
      });

      console.log(`Created pending subscription with ID: ${subscriptionRef.id}`);
      
      alert(`You have selected ${plan.name}. Proceeding to payment...`);
      // In the next step, we will use the subscriptionRef.id to create a Stripe Checkout session.
      // router.push(`/checkout?sub_id=${subscriptionRef.id}`);

    } catch (error) {
      console.error('Failed to create subscription:', error);
      alert('サブスクリプションの作成中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/patient/dashboard" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="ml-4 text-xl font-bold text-gray-800">プランを選択</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            あなたに合ったプランをお選びください
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            全てのプランには、クリニックと私たちの会社への手数料の内訳が明記されています。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white flex flex-col"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">¥{plan.price.toLocaleString()}</span>
                  <span className="text-base font-medium text-gray-500">/月</span>
                </p>
                <div className="mt-4 text-sm text-gray-600 p-3 bg-gray-100 rounded-md">
                  <p className="font-semibold">料金内訳:</p>
                  <p>クリニックへの報酬: ¥{plan.commission.toLocaleString()}</p>
                  <p>会社への手数料: ¥{plan.companyCut.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <h4 className="font-semibold text-gray-900">含まれる機能:</h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isLoading && selectedPlan?.id === plan.id ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                >
                  {isLoading && selectedPlan?.id === plan.id ? '処理中...' : `${plan.name} を選択`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 
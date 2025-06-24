import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getFirestore, doc, setDoc, updateDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PLANS } from '../../lib/plans';

// Type for a plan from PLANS
interface PlanType {
  id: string;
  name: string;
  total: number;
  clinicCommission: number;
  adminRevenue: number;
  description: string;
}

interface PatientData {
  plan?: string;
  status?: 'active' | 'pending' | 'cancelled' | 'suspended';
  clinicId?: string;
}

export default function PatientSubscription() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsCheckingStatus(false);
      return;
    }

    const checkSubscriptionStatus = async () => {
      try {
        const db = getFirestore();
        const patientRef = doc(db, 'patients', user.uid);
        const docSnap = await getDoc(patientRef);
        if (docSnap.exists()) {
          setPatientData(docSnap.data() as PatientData);
        }
      } catch (error) {
        console.error("Failed to check patient's subscription status:", error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkSubscriptionStatus();
  }, [user]);

  const handleSelectPlan = async (plan: PlanType) => {
    if (!user) {
      router.push('/patient/login');
      return;
    }
    setIsLoading(true);
    setSelectedPlan(plan);
    try {
      const db = getFirestore();
      // 1. Create a new subscription document in 'subscriptions' collection
      const subscriptionRef = doc(collection(db, 'subscriptions'));
      await setDoc(subscriptionRef, {
        subscriptionId: subscriptionRef.id,
        patientId: user.uid,
        clinicId: patientData?.clinicId || 'unassigned',
        plan: plan.id,
        status: 'pending',
        amount: plan.total,
        clinicCommission: plan.clinicCommission,
        adminRevenue: plan.adminRevenue,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      // 2. Update the patient's document in 'patients' collection
      const patientRef = doc(db, 'patients', user.uid);
      await updateDoc(patientRef, {
        subscriptionId: subscriptionRef.id,
        plan: plan.id,
        status: 'pending',
      });

      // 3. Create an activity feed event for real-time tracking
      const activityRef = doc(collection(db, 'activity_feed'));
      await setDoc(activityRef, {
        activityId: activityRef.id,
        type: 'new_signup',
        patientId: user.uid,
        clinicId: patientData?.clinicId || 'unassigned',
        message: `新規患者が「${plan.name}」に申し込みました。`,
        timestamp: serverTimestamp(),
        details: {
          plan: plan.name,
        },
      });

      alert(`「${plan.name}」を選択しました。次のステップへ進みます。`);
      // router.push(`/checkout?sub_id=${subscriptionRef.id}`);
    } catch (error) {
      console.error('Failed to create subscription:', error);
      alert('サブスクリプションの作成中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  const hasActiveSubscription = patientData?.status === 'active' || patientData?.status === 'pending';

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

        {isCheckingStatus ? (
          <div className="text-center mt-10">
            <p>現在の契約状況を確認しています...</p>
          </div>
        ) : hasActiveSubscription ? (
          <div className="mt-10 text-center p-6 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-800">
              {patientData?.status === 'active' ? '既にプランに加入済みです' : 'お手続き中のプランがあります'}
            </h3>
            <p className="mt-2 text-yellow-700">
              現在「{patientData?.plan}」プラン
              {patientData?.status === 'active' ? 'に加入中です。' : 'のお申し込み手続きが進行中です。'}
            </p>
            <Link
              href="/patient/dashboard"
              className="mt-4 inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              ダッシュボードへ戻る
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan: PlanType) => (
              <div
                key={plan.id}
                className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white flex flex-col"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-500">{plan.description}</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">¥{plan.total.toLocaleString()}</span>
                    <span className="text-base font-medium text-gray-500">/月</span>
                  </p>
                  <div className="mt-4 text-sm text-gray-600 p-3 bg-gray-100 rounded-md">
                    <p className="font-semibold">料金内訳:</p>
                    <p>クリニックへの報酬: ¥{plan.clinicCommission.toLocaleString()}</p>
                    <p>会社への手数料: ¥{plan.adminRevenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  {/* Optionally, add features or benefits here if needed */}
                </div>
                <div className="p-6">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isLoading || hasActiveSubscription}
                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                      ${isLoading && selectedPlan?.id === plan.id ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
                      ${hasActiveSubscription ? 'bg-gray-400 cursor-not-allowed' : ''}
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                  >
                    {isLoading && selectedPlan?.id === plan.id ? '処理中...' : `${plan.name} を選択`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 
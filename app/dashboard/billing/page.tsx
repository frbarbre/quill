import Billingform from '@/components/Billingform';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import React from 'react';

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <Billingform subscriptionPlan={subscriptionPlan} />;
};

export default Page;

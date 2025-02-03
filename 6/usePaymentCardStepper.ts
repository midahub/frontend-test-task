import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardDataType, useGetPaymentLinkCardMutation, useGetStatusQuery } from '../api/stepper/payment.api';

export const usePaymentCardStepper = () => {
  const paymentId = localStorage.getItem('payment_id') ?? '';
  const navigate = useNavigate();
  const [sendPaymentLink, { isLoading: isPaymentLinkLoading, isError, isSuccess: isPaymentLinkSuccess }] = useGetPaymentLinkCardMutation();
  const {
    data,
    isLoading,
    refetch: refetchStatus,
    isFetching: isStatusFetching,
    isError: isStatusError,
    isSuccess: isStatusSuccess
  } = useGetStatusQuery(paymentId ? { id: paymentId } : skipToken, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true
  });

  const getPaymentCardLink = async  ({
    email,
    is_gift,
    currency,
    product_name,
  }: CardDataType) => {
    const response = await sendPaymentLink({
      email: email,
      product_name: product_name,
      currency: currency,
      is_gift: is_gift,
    }).unwrap()

    localStorage.setItem('payment_id', response.id);
    window.location.href = response.paymentUrl;
  };

  useEffect(() => {
    if (data === undefined || isStatusFetching || isLoading) return;

    if (data) {
      navigate('/payment-success');
    } else {
      navigate('/payment-failed');
    }

  }, [data, navigate, isStatusFetching, isLoading]);

  return {
    getPaymentCardLink,
    isLoading: isLoading || isPaymentLinkLoading,
    isError: isError || isStatusError,
    isStatusSuccess,
    isPaymentLinkSuccess,
    refetchStatus
  };
};

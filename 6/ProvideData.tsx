import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  PaymentDataScheme,
  PaymentDataType,
} from '@/features/payment/model/paymentData.scheme';
import { Input, Button } from '@/shared/component';
import { useQueryParam } from '@/shared/hooks';
import { useCustomForm } from '@/shared/hooks/useCustomForm';
import { PaymentPrice, TypeBanksTogle, Warning } from '@/widgets';

import styles from '../../styles/provide.module.scss';

export const ProvideData = () => {
  const { values, setQuery } = useQueryParam();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useCustomForm({
    schema: PaymentDataScheme,
    defaultValues: {
      step: values.step,
      bank: values.bank,
      email: values.email,
      paymentMethod: values.variant,
      rate: values.rate,
      price: values.price,
      duration: values.duration,
    },
  });
  const navigate = useNavigate();

  const handleData: SubmitHandler<PaymentDataType> = (data) => {
    const query = `?step=1&price=${values.price}&email=${data.email}&rate=${values.rate}&duration=${values.duration}&productName=${values.productName}&variant=${values.variant}&bank=${values.bank}`;
    setQuery({ email: data.email });
    navigate('/card-payment' + query);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className={styles.form}>
      <Warning />

      <PaymentPrice countOfMonth={values.duration} productName={values.productName} />

      <TypeBanksTogle />

      <div>
        <p className={styles.section_title}>Ваш Email</p>
        <Input
          type="email"
          label="Email"
          theme="dark"
          variant="big"
          {...register('email')}
        />
      </div>

      <div>
        <p className={styles.section_title}>Стоимость</p>
        <p className={styles.section_price}>
          {values.price} <span>РУБ</span>
        </p>
      </div>

      <div className={styles.footer}>
        <Button type="submit" variant="payment" size="xl" disabled={!isValid}>
          Перейти к оплате
        </Button>
      </div>
    </form>
  );
};

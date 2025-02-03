import { Container } from '@/shared/component';
import { useQueryParam } from '@/shared/hooks';
import { HeaderSecond, PaymentIndicator } from '@/widgets';

import styles from '../styles/provide.module.scss';

import { ConfirmData } from './cardSteps/ConfirmData';
import { ProvideData } from './cardSteps/ProvideData';

const cardSteps = [<ProvideData />, <ConfirmData />];

export const CardStepper = () => {
  const { values } = useQueryParam();

  return (
    <div className={styles.container}>
      <HeaderSecond text={'Оплата'} className={styles.header} />

      <Container className={styles.container_100}>
        <div className={styles.content}>
          <PaymentIndicator
            list={['Выбор', 'Данные', 'Оплата']}
            className={styles.full}
            currentStep={values.step}
          />

          {cardSteps[values.step]}
        </div>
      </Container>
    </div>
  );
};

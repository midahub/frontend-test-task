import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import avatarExample from '/avatar/example2.png';

import { SelectType } from '@/features/payment/index';
import Modal from '@/shared/component/modal/Modal';
import useAuth from '@/shared/hooks/useAuth';
import useModal from '@/shared/hooks/useModal';
import { HeaderSecond } from '@/widgets';

import { Reviews } from '@widgets/review/ui/Reviews.tsx';
import { SubscriptionOption } from '@widgets/subscribeItem/ui/SubscriptionOptions.tsx';

import { Button, Loader } from '@shared/component';

import styles from './channelSelection.module.scss';

const reviewsData = [
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
      'Предложение 6',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
  {
    avatar: avatarExample,
    name: 'Имя',
    review: [
      'Предложение 1',
      'Предложение 2',
      'Предложение 3',
      'Предложение 4',
      'Предложение 5',
    ],
  },
];

export const ChannelSelection: FC = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const { isAuthorized, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleReviewClick = (index: number) => {
    navigate(`/story-review/${index}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.modal}>
      <HeaderSecond text="Покупка подписки" goBack={() => navigate('/')} />

      <div className={styles.block}>
        <p className={styles.subscribe}>ПОДПИШИСЬ И ПОЛУЧИ:</p>

        <SubscriptionOption
          title="Доступ к эксклюзивному контенту"
          description="Курсы, сотни эфиров, гайды, подкасты, статьи и лучшие тренинги за последние 10 лет."
        />
        <SubscriptionOption
          title="Трансляции"
          description="Еженедельные трансляции и ответы на вопросы."
        />
        <SubscriptionOption
          title="Промокоды"
          description="Скидки на анализы крови, добавки и другие товары."
        />
        <SubscriptionOption
          title="Сообщество"
          description="Присоединяйтесь к сообществу из 60+ тысяч человек для мощного обмена опытом."
        />
      </div>

      <div className={styles.block}>
        <p className={styles.review}>ОТЗЫВЫ</p>
        <Reviews reviews={reviewsData} onReviewClick={handleReviewClick} />
      </div>

      <div className={styles.button_container}>
        <Button
          variant="payment"
          size="xl"
          className={styles.button}
          onClick={handleOpen}
        >
          {isAuthorized ? 'Подписаться' : 'Войти и подписаться'}
        </Button>
      </div>

      <Modal isOpen={isOpen}>
        <SelectType handleClose={handleClose} />
      </Modal>
    </div>
  );
};

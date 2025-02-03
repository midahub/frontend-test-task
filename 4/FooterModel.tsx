import { NavLink, useNavigate } from 'react-router-dom';

import {
  GroupsIcon,
  HomeIcon,
  LearningIcon,
  ProvileIcon,
  SubChanelIcon,
} from '@/shared/assets/icons/footerIcons';
import { Container, Button } from '@/shared/component';

import styles from './footer.module.scss';

export const FooterModel = () => {
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  const toChannelSelection = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    navigate('/channel-selection');
  };

  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.footer__container}>
          {currentPage != '/profile' && currentPage != '/profile/edit' ? (
            <Button
              variant="payment"
              size="xl"
              className={styles.button_fixed}
              onClick={toChannelSelection}
            >
              Оформить подписку
            </Button>
          ) : null}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? `${styles.block_active} ${styles.block}` : styles.block
            }
          >
            <HomeIcon />
            Главное
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.block_active_sec} ${styles.block}` : styles.block
            }
            to={'/base'}
          >
            <LearningIcon />
            Обучающая база
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.block_active_sec} ${styles.block}` : styles.block
            }
            to={'/subchannels'}
          >
            <SubChanelIcon />
            Подканалы
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.block_active_sec} ${styles.block}` : styles.block
            }
            to={'/community'}
          >
            <GroupsIcon />
            Сообщество
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.block_active_sec} ${styles.block}` : styles.block
            }
            to={'/profile'}
          >
            <ProvileIcon />
            Профиль
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

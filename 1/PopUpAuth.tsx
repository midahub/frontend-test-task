import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGenerateFromTelegramMutation } from '@features/user/api/popUpAuth.api.ts';

import key from '@shared/assets/icons/reg/key.svg';
import telegram from '@shared/assets/icons/reg/telegram.svg';
import telephone from '@shared/assets/icons/reg/telephone.svg';
import { Typography, Button } from '@shared/component';

import styles from './auth.module.scss';

declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

interface PopUpAuthProps {
  onClose: () => void;
}

export const PopUpAuth: FC<PopUpAuthProps> = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [generateFromTelegram] = useGenerateFromTelegramMutation();
  const navigate = useNavigate();

  const closePopup = () => {
    const popupBody = document.querySelector(`.${styles.popup_body}`);
    if (popupBody) {
      popupBody.classList.add(styles.closing);
      setTimeout(() => onClose(), 400);
    }
  };

  window.onTelegramAuth = (user: any) => {
    generateFromTelegram({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
      auth_date: user.auth_date,
      hash: user.hash,
    })
      .unwrap()
      .then((data) => {
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        console.log('Авторизация успешна:', data);
        window.dispatchEvent(new Event('storage'));
        navigate('/channel-selection');
        closePopup();
      })
      .catch((error) => console.error('Ошибка при авторизации через Telegram:', error));
  };

  useEffect(() => {
    const telegramLoginDiv = document.getElementById('telegram-login');

    if (telegramLoginDiv) {
      telegramLoginDiv.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', 'ArsenBazaAuthBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
      telegramLoginDiv.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_body}>
        <span className={styles.line}></span>
        {/*TODO: Заменить на компонент FunctionButton(когда он будет сверстан)*/}
        <button className={styles.close_btn} onClick={closePopup}>
          Закрыть
        </button>
        <Typography variant="h3_18_sb" className={styles.verif}>
          ВЫБЕРИТЕ СПОСОБ ВЕРИФИКАЦИИ
        </Typography>

        <img className={styles.key} src={key} alt="/" />

        <div className={styles.termsWrapper}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className={styles.customCheckbox}></span>
            <Typography variant="text_s_12_sb" className={styles.termsText}>
              Согласен с
              <a className={styles.link} href="#">
                Правилами продажи
              </a>
              , с
              <a className={styles.link} href="#">
                Условиями обработки персональных данных
              </a>
              и
              <a className={styles.link} href="#">
                Правилами получения рекламной рассылки
              </a>
            </Typography>
          </label>
        </div>

        <div className={styles.customButtonWrapper}>
          <Button
            className={`${styles.customTelegramButton} ${
              !isChecked ? styles.disabledButton : ''
            }`}
            disabled={!isChecked}
          >
            <i>
              <img
                className={`${styles.icon} ${!isChecked ? styles.disabledIcon : ''}`}
                src={telegram}
                alt="/"
              />
            </i>
            Telegram
          </Button>

          <div
            id="telegram-login"
            className={`${styles.telegramWidget} ${
              !isChecked ? styles.disabledWidget : ''
            }`}
          ></div>
        </div>

        <Button
          className={`${styles.phone_btn} ${!isChecked ? styles.disabledButton : ''}`}
          disabled={!isChecked}
        >
          <i>
            <img
              className={`${styles.icon} ${!isChecked ? styles.disabledIcon : ''}`}
              src={telephone}
              alt="/"
            />
          </i>
          Телефон
        </Button>
      </div>
    </div>
  );
};

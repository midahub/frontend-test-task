import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FooterModel, LogoutPopup } from '@/widgets';

import {
  useEditProfileMutation,
  useGetProfileQuery,
} from '@pages/Profile/api/profile.api.ts';
import { StatusBar, EmailPopup } from '@pages/Profile/EditProfile/ui/widgets';
import { NoAuthProfile } from '@pages/Profile/Profile/ui/widgets';

import { CameraIcon } from '@shared/assets/icons';
import { FunctionButton, Loader, Input } from '@shared/component';
import useModal from '@shared/hooks/useModal.ts';

import styles from './styles.module.scss';

export const EditProfile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useGetProfileQuery();
  const [editProfile] = useEditProfileMutation();
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');

  const {
    isOpen: logoutIsOpen,
    handleOpen: handleLogoutOpen,
    handleClose: handleLogoutClose,
  } = useModal();
  const {
    isOpen: emailIsOpen,
    handleOpen: handleEmailOpen,
    handleClose: handleEmailClose,
  } = useModal();

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = { first_name: firstName, last_name: lastName };
      await editProfile(updatedProfile).unwrap();
      navigate('/profile');
    } catch (err) {
      alert('Не удалось обновить профиль. Попробуйте снова.');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!profile) {
    return (
      <>
        <NoAuthProfile />
        <FooterModel />
      </>
    );
  }

  return (
    <>
      <StatusBar onSave={handleSaveProfile} />

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.avatar}>
            <CameraIcon />
          </div>
          <FunctionButton variant="tertiary" fontWeight="semibold">
            Выберите фотографию
          </FunctionButton>
        </div>

        <div className={styles.form}>
          <Input
            variant="big"
            placeholder="Имя"
            label="Имя"
            name="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            variant="big"
            placeholder="Фамилия"
            name="surname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            variant="big"
            placeholder="Телеграм"
            label="Телеграм"
            disabled={true}
            value={profile.username}
          />

          <div onClick={handleEmailOpen}>
            <Input
              style={{ pointerEvents: 'none' }}
              variant="big"
              placeholder="Почта"
              label="Почта"
              disabled={true}
              value={profile.emails[1]}
            />
          </div>
        </div>

        <div className={styles.button}>
          <FunctionButton
            variant="error"
            fontWeight="semibold"
            onClick={handleLogoutOpen}
          >
            Выйти
          </FunctionButton>
        </div>
      </div>
      {logoutIsOpen && <LogoutPopup onClose={handleLogoutClose} />}
      {emailIsOpen && <EmailPopup onClose={handleEmailClose} />}
    </>
  );
};

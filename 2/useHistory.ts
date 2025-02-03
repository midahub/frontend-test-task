import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/app/store/store';

import { restore } from '../slices/historySlice';

export const useHistory = () => {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestore = (direction: 'next' | 'prev') => {
    dispatch(restore({ direction: direction }));
  };

  useEffect(() => {
    if (!history.nextPage) return;

    navigate(`${history.nextPage}`);
  }, [history.nextPage, navigate]);

  return {
    states: {
      isPrevUsable: history.currentIndex > 0,
      isNextUsable: history.nextPages.length !== 0,
    },
    restore: handleRestore,
  };
};

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';

const useWelcomeGuard = () => {
  const history = useHistory();

  useEffect(() => {
    const check = async () => {
      const { value } = await Preferences.get({ key: 'hasSeenWelcome' });
      if (!value) {
        history.replace('/welcome');
      }
    };
    check();
  }, []);
};

export default useWelcomeGuard;
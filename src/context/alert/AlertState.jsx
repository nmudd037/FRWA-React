import { useAlert } from 'react-alert';

import AlertContext from './AlertContext';

const AlertState = (props) => {
  const alert = useAlert();
  const alertGenerator = (type, message) => {
    switch (type) {
      case 'show':
        return alert.show(message);
      case 'error':
        return alert.error(message);
      case 'success':
        return alert.success(message);
      default:
        return alert.show(message);
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alertGenerator,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

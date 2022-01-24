import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

// styles implemented in "../styles/components/alertProvider.scss"

// provides a function alertUser(message,type), type: 'error' || 'success' || 'default'
// a custom alert box notifies the entered message to user for 5 seconds

const alertContext = createContext();

const AlertProvider = ({ children, time = 5000 }) => {
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: 'default',
  });
  const alertUser = useCallback((message, type) => {
    setAlertMessage({ message: message, type: type });
  }, []);

  useEffect(() => {
    let clearMessage;
    if (alertMessage.message)
      clearMessage = setTimeout(() => {
        setAlertMessage({ message: '', type: 'default' });
      }, time);

    return () => {
      clearTimeout(clearMessage);
    };
  }, [time, alertMessage]);

  return (
    <alertContext.Provider value={alertUser}>
      {alertMessage.message && (
        <div className={`alert-container ${alertMessage.type}`}>
          <div>
            <p>{alertMessage.message}</p>
            <button
              type="button"
              onClick={() => {
                setAlertMessage({ message: '', type: 'default' });
              }}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      )}
      {children}
    </alertContext.Provider>
  );
};

export default AlertProvider;
export const useAlertContext = () => useContext(alertContext);

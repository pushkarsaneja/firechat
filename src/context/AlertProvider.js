import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

// styles implemented in "../styles/components/alertProvider.scss"

const alertContext = createContext();

const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('default');

  const alertUser = useCallback((message, type) => {
    setMessage(message);
    setType(type); //type: 'error' || 'success' || 'default'
  }, []);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      if (message) setMessage('');
      if (type !== 'default') setType('default');
    }, 5000);

    return () => {
      clearTimeout(clearMessage);
    };
  }, [message, type]);

  return (
    <alertContext.Provider value={alertUser}>
      {message && (
        <div className={`alert-container ${type}`}>
          <div>
            <p>{message}</p>
            <button
              type="button"
              onClick={() => {
                setMessage('');
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

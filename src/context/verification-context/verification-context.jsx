import React, { createContext, useState } from 'react';

export const EmailVerificationContext = createContext();

export const EmailVerificationProvider = ({ children }) => {
  const [emailToVerify, setEmailToVerify] = useState('');

  return (
    <EmailVerificationContext.Provider value={{ emailToVerify, setEmailToVerify }}>
      {children}
    </EmailVerificationContext.Provider>
  );
};
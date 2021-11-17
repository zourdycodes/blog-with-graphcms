import React from 'react';
import { Header } from '../molecules/Header';

export const Wrapper: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

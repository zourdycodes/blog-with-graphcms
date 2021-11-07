import React from 'react';
import { Header } from '../molecules/Header';

export const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

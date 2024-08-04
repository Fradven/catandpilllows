/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Spacer } from '@nextui-org/spacer';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ background: '#C3A298', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 20px', textAlign: 'center' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h3>
      <Spacer y={1} />
      <Input placeholder="Email" fullWidth />
      <Spacer y={1} />
      <Input type="password" placeholder="Password" fullWidth />
      {!isLogin && (
        <>
          <Spacer y={1} />
          <Input type="password" placeholder="Confirm Password" fullWidth />
        </>
      )}
      <Spacer y={1} />
      <Button color="primary" onClick={() => setIsLogin(!isLogin)} style={{ width: '100%' }}>
        {isLogin ? 'Sign Up' : 'Login'}
      </Button>
    </div>
  );
};

export default LoginForm;

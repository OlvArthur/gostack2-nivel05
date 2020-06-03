import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  name: string;
  id: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const loggedUser = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (loggedUser && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        user: JSON.parse(loggedUser),
        token,
      };
    }
    // return {};
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    localStorage.setItem('@GoBarber:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    user => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

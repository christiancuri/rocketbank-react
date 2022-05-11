import { FC, createContext, useContext, useEffect, useState } from 'react';

import { apiClient } from 'src/common/api';
import { Session } from 'src/common/api/Session';
import { UserRequests } from 'src/common/api/user';
import { TUserInfo } from 'src/common/api/user/user.types';

const DEFAULT_AVATAR = 'https://i.imgur.com/IB3m1Dq.png';

type AuthState = {
  isAuthenticated: boolean;
  initialized: boolean;
  user: TUserInfo;
};

type AuthContext = AuthState & {
  signin(_email: string, _password: string): Promise<void>;
  signup(_name: string, _email: string, _password: string): Promise<void>;
  signout(): Promise<void>;
};

const setSession = (accessToken: string) => {
  if (accessToken) {
    Session.setSession(accessToken);
    apiClient.defaults.headers.common.Authorization = accessToken;
  } else {
    Session.clearSession();
    delete apiClient.defaults.headers.common.Authorization;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  initialized: false
};

export const AuthContext = createContext<AuthContext>({
  ...initialState,
  signin: async () => Promise.resolve(),
  signup: async () => Promise.resolve(),
  signout: async () => Promise.resolve()
});

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  const initialize = async () => {
    const accessToken = Session.getSessionToken();

    if (accessToken) {
      setState((cState) => ({
        ...cState,
        isAuthenticated: true,
        initialized: true
      }));

      const user = await UserRequests.getUserInfo();
      setState((cState) => ({
        ...cState,
        user: {
          name: user?.name || 'Loading...',
          avatar: DEFAULT_AVATAR
        }
      }));
    } else {
      setState((cState) => ({
        ...cState,
        isAuthenticated: false,
        initialized: true
      }));
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signin = async (email: string, password: string) => {
    const { accessToken, user } = await UserRequests.signIn({
      email,
      password
    });
    setSession(accessToken);
    setState((cState) => ({
      ...cState,
      isAuthenticated: true,
      user: {
        name: user?.name || 'Loading...',
        avatar: DEFAULT_AVATAR
      }
    }));
  };

  const signup = async (name: string, email: string, password: string) => {
    const { accessToken, user } = await UserRequests.signUp({
      name,
      email,
      password
    });
    setSession(accessToken);
    setState((cState) => ({
      ...cState,
      isAuthenticated: true,
      user: {
        name: user?.name || 'Loading...',
        avatar: DEFAULT_AVATAR
      }
    }));
  };

  const signout = async () => {
    setSession(null);
    window.location.href = '/'; // Force reset browser state
  };

  return {
    ...state,
    signin,
    signup,
    signout
  };
}

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

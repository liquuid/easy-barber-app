import React, { createContext , useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';

interface SignIntCredendials {
    email: string;
    password: string;
}

interface AuthState {
    token: string;
    user: object;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignIntCredendials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>(
     {} as AuthContextData,
 );

const AuthProvider: React.FC = ({ children }) => {
     const [data, setData] = useState<AuthState>({} as AuthState);
     useEffect(() => {
        async function loadStoragedData(): Promise<void> {
            const token = await AsyncStorage.getItem('@EasyBarber:token');
            const user = await AsyncStorage.getItem('@EasyBarber:user');

            if(token && user ){
                setData({ token: token, user: JSON.parse(user) });
            }
        }
     }, [])
     const signIn = useCallback(async ({ email, password })=>{
         const response = await api.post('sessions', {
             email,
             password
         });
         const { token, user } = response.data;

         await AsyncStorage.setItem('@EasyBarber:token', token);
         await AsyncStorage.setItem('@EasyBarber:user', JSON.stringify(user));

         setData({ token, user});
     },[]);

     const signOut = useCallback(async ()=>{
        await AsyncStorage.removeItem('@EasyBarber:token');
        await AsyncStorage.removeItem('@EasyBarber:user');
        setData({} as AuthState);

     },[]);
    return(
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }} >
            {children}
        </AuthContext.Provider>
    );
 };

 function useAuth(): AuthContextData {
     const context = useContext(AuthContext);

     if (!context){
         throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
 }

 export  { AuthProvider, useAuth }

import React from 'react';
import { 
     Image,
     View,
     ScrollView,
     KeyboardAvoidingView ,
     Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { 
     Container,
     Title, 
     ForgotPassword,
     ForgotPasswordText,
     CreateAccountButton,
     CreateAccountButtonText 
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';


import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
    return (
        <>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding': undefined }
            style={{flex: 1}}
            enabled
        >
            <ScrollView 
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
                >
                <Container>
                    <Image source={logoImg} />
                    <View>
                        <Title>Faça seu logon </Title>
                    </View>
                    <Input name="email" icon="mail" placeholder="Email" />
                    <Input name="password" icon="lock" type="password" placeholder="Senha" />
                    <Button onPress={() => { console.log('fooo')} }>Entrar</Button>
                    <ForgotPassword onPress={() => {} }>
                        <ForgotPasswordText>
                            Esqueci minha senha
                        </ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <CreateAccountButton onPress={() => { }}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>
                Criar nova conta
            </CreateAccountButtonText>
        </CreateAccountButton>
        </>
    );

    
};

export default SignIn;
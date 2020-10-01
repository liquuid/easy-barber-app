import React , { useEffect , useRef } from 'react';
import { TextInputProps } from 'react-native';
import {useField } from '@unform/core';

import { Container , TextInput, Icon } from './styles';
import { any } from 'core-js/fn/promise';


interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}
interface inputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest }) => {
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<inputValueReference>({value: defaultValue});
    

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                 inputValueRef.current.value = value;
                 inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }

        });
    }, [registerField,fieldName])

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />
            <TextInput 
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value; 
                }}
                {...rest}

            />
        </Container>
    );
}
export default Input;
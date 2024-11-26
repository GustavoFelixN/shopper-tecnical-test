import React, { ChangeEvent } from 'react';
import { StyledInput, StyledInputContainer, ErrorMessage } from './styles.ts';

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChange,
    error,
}) => {
    const hasError = !!error;

    return (
        <StyledInputContainer>
            <StyledInput
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                hasError={hasError}
            />
            {hasError && <ErrorMessage>{error}</ErrorMessage>}
        </StyledInputContainer>
    );
};

export default Input;

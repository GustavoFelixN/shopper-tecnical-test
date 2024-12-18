import styled from 'styled-components';

export const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding-bottom: 5px;
`;

export const StyledInput = styled.input<{ hasError: boolean }>`
    padding: 10px;
    border: 2px solid ${(props) => (props.hasError ? '#ff4d4d' : '#0dab78')};
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    transition: border-color 0.3s;
    background-color: #ffffff;
    color: #000000;

    &:focus {
        border-color: ${(props) => (props.hasError ? '#ff4d4d' : '#0c9a6a')};
    }
`;

export const ErrorMessage = styled.span`
    font-size: 14px;
    color: #ff4d4d;
`;

import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    overflow-y: scroll;
    scrollbar-width: none;
`;

export const ErrorContainer = styled.div`
    background-color: rgb(255, 255, 255);
    height: 30%;
    width: 80%;
    padding: 20px;
    margin: 20px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const ErrrorText = styled.h2`
    color: #0dab78;
`;

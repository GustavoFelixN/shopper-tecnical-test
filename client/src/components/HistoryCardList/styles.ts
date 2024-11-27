import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    margin: 25px;
    border-radius: 50px;
    z-index: 10;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    overflow-y: auto;
    scrollbar-width: none;
`;

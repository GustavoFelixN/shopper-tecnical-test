import styled from 'styled-components';

export const Container = styled.div`
    width: 30%;
    background-color: white;
    border: 2px solid gray;
    border-left: 8px solid #0dab78;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 10px;
    color: #000000;
`;
export const TitleView = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid gray;
    justify-content: space-between;
`;
export const Date = styled.h3``;
export const Driver = styled.h3``;
export const Address = styled.p`
    margin: 0;
`;
export const AddressView = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
`;
export const RouteView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const Metric = styled.p`
    margin: 0;
`;
export const Metrics = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const Value = styled.h3`
    margin: 0;
    justify-self: center;
`;
export const Text = styled.p`
    font-weight: bold;
    margin: 0;
    margin-right: 10px;
`;

export const MetricView = styled(AddressView)`
    padding-top: 20px;
`;

export const ValueView = styled(MetricView)`
    justify-content: right;
`;

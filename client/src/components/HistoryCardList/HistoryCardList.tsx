import React from 'react';
import { HistoryCard } from '../index';
import { HistoryCardProps } from '../HistoryCard/HistoryCard';
import { Container } from './styles';

export interface HistoryListProps {
    historic: Array<HistoryCardProps>;
}

const HistoryCardList: React.FC<HistoryListProps> = ({ historic }) => {
    return (
        <Container>
            {historic.map((h) => (
                <HistoryCard {...h} />
            ))}
        </Container>
    );
};

export default HistoryCardList;

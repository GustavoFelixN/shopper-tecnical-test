import React from 'react';
import { HistoryCard } from '../index';
import { HistoryCardProps } from '../HistoryCard/HistoryCard';

export interface HistoryListProps {
    historic: Array<HistoryCardProps>;
}

const HistoryCardList: React.FC<HistoryListProps> = ({ historic }) => {
    return (
        <>
            {historic.map((h) => (
                <HistoryCard {...h} />
            ))}
        </>
    );
};

export default HistoryCardList;

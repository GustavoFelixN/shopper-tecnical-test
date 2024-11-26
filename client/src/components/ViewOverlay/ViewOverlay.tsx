import React from 'react';
import { StyledViewOverlay } from './styles';

interface ViewProps {
    children: React.ReactNode;
}

const ViewOverlay: React.FC<ViewProps> = ({ children }) => {
    return <StyledViewOverlay>{children}</StyledViewOverlay>;
};

export default ViewOverlay;

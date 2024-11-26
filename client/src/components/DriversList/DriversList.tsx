import React from "react";
import { Container } from "./styles";
import { ViewOverlay, DriverCard } from '../index';
import { DriverProps } from "../DriverCard/DriverCard";

interface DriversListProps {
  drivers: Array<DriverProps>;
  onSelection: () => {};
}

const DriversList: React.FC<DriversListProps> = ({ drivers, onSelection }) => {
  return (
    <ViewOverlay>
      <Container>
        {drivers.map((driver) => <DriverCard driver={driver} onSelection={onSelection} />)}
      </Container>
    </ViewOverlay>
  )
};

export default DriversList;

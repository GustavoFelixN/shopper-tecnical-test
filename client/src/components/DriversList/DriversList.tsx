import React from "react";
import { Container } from "./styles";
import { ViewOverlay, DriverCard } from '../index';
import { DriverCardProps } from "../DriverCard/DriverCard";

interface DriversListProps {
  drivers: Array<DriverCardProps>
}

const DriversList: React.FC<DriversListProps> = ({ drivers }) => {
  return (
    <ViewOverlay>
      <Container>
        {drivers.map((driver) => <DriverCard {...driver} />)}
      </Container>
    </ViewOverlay>
  )
};

export default DriversList;

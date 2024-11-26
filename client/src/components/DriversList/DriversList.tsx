import React from "react";
import { Container, ErrorContainer, ErrrorText } from "./styles";
import { ViewOverlay, DriverCard, Button } from '../index';
import { DriverProps } from "../DriverCard/DriverCard";

interface DriversListProps {
  drivers: Array<DriverProps>;
  onSelection: () => void;
}

const DriversList: React.FC<DriversListProps> = ({ drivers, onSelection }) => {
  return (
    <ViewOverlay>
      <Container>
        {
          drivers.length > 0 ?
            (drivers.map((driver) => <DriverCard driver={driver} onSelection={onSelection} />))
            :
            (<ErrorContainer>
              <ErrrorText>Nenhum motorista encotrado para essa rota :(</ErrrorText>
              <Button label="Voltar" />
            </ErrorContainer>)
        }
      </Container>
    </ViewOverlay>
  )
};

export default DriversList;

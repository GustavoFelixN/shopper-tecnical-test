import { FC } from 'react';
import { StyledButton } from './styles.ts';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {

  return (
    <StyledButton
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

export default Button;


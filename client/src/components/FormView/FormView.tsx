import React from "react";
import { StyledView } from "./styles";

interface FormViewProps {
	children: React.ReactNode;
}

const FormView: React.FC<FormViewProps> = ({ children }) => {
	return (
		<StyledView>
			{children}
		</StyledView>
	)
}

export default FormView;

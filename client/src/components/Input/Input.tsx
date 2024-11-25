import React, { ChangeEvent } from "react";
import { StyledInput } from './styles.ts';

interface InputProps {
	placeholder: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {

	return (
		<StyledInput
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default Input;

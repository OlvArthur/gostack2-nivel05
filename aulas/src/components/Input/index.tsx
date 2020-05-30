import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { IconType } from 'react-icons/lib/cjs';
import { FiAlertCircle } from 'react-icons/fi';
// import { IconBaseProps } from 'react-icons/lib/cjs';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: IconType;
  // icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const InputRef = useRef<HTMLInputElement>(null);

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!InputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={InputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;

import { ReactNode, forwardRef } from 'react';

type Props = {
  id: string,
  placeholder: string,
  type: string,
  children: ReactNode,
  inputProperty?: {
    [name: string]: string
  }
};

const Input = forwardRef<HTMLInputElement, Props>((
  { id, placeholder, type, children, inputProperty = {}}: Props,
  ref
) => {
  return (
    <>
      <label
        htmlFor={id}
        className='input-label'
      >{children}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className='input'
        ref={ref}
        {...inputProperty}
      />
    </>
  );
});

export default Input;
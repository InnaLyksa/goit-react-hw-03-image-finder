import styled from 'styled-components';

export const Btn = styled.button`
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #14c287;
  color: black;
  font-family: inherit;
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14);

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: #fff;
  }
`;

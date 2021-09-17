import styled from "styled-components";

export const Container = styled.div`
  min-height: 480px;
  padding: 24px;
  background: #fff;
`;

export const InnerHeader = styled.div`
  flex: 1;
  flex-direction: row;
  border-width: 2px;
  background-color: #ffd700;
  height: 70px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

export const InnerButtonNovo = styled.div`
  flex: 1;
  flex-direction: row;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Text = styled.text`
  font-weight: bold;
  font-size: 30px;
`;

export const Button = styled.button`
  color: #000;
  font-size: 16px;
  font-weight: bold;
  background: #ffd700;
  height: 40px;
  border: 0;
  border-radius: 5px;
  width: 100px;
`;

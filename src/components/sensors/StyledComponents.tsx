import styled from "styled-components";

export const SensorData = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;

  &.multiline {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
`;

export const StyledSensorName = styled.span`
  font-weight: bold;
  text-transform: capitalize;

  &.uppercase {
    text-transform: uppercase;
  }
`;

export const SensorValue = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.3rem 0;
`;

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 5rem;
  padding: 2px;
`;

export const DataLabel = styled.p`
  margin: 0.5rem 0.5rem;
  font-style: italic;
`;

export const Data = styled.span``;

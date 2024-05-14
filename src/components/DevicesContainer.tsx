import React from "react";
import { ISensorBooleanMap, KeyDeviceMap } from "../common/types";
import styled from "styled-components";
import DeviceContainer from "./DeviceContainer";

interface IDevicesContainer {
  devices: KeyDeviceMap;
  setDevices: React.Dispatch<React.SetStateAction<KeyDeviceMap>>;
  sendMessage: (address: string, data: string | number) => void;
  sensorEnabledMap: ISensorBooleanMap;
}

export function DevicesContainer({
  devices,
  setDevices,
  sensorEnabledMap,
  sendMessage
}: IDevicesContainer) {
  /*const windowLocation = useWindowLocation();
  const queryString = windowLocation.search;
  const sensorEnabledMap: ISensorBooleanMap = useMemo(() => {
    const params = new URLSearchParams(queryString);
    const queryParams = {
      sensors: params.get("sensors") || " "
    };
    const sensorArray = queryParams.sensors.split(",");
    return sensorArray.reduce((acc: ISensorBooleanMap, sensor: string) => {
      acc[sensor as SensorName] = true;
      return acc;
    }, {} as ISensorBooleanMap);
  }, [queryString]);*/

  return (
    <StyledDevicesContainer>
      {Object.entries(devices).map(function ([deviceIndex, device]) {
        return (
          <DeviceContainer
            device={device}
            sensorEnabledMap={sensorEnabledMap}
            setDevices={setDevices}
            deviceDataIndex={deviceIndex}
            key={deviceIndex}
            sendMessage={sendMessage}
          />
        );
      })}
    </StyledDevicesContainer>
  );
}

const StyledDevicesContainer = styled.section`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 0.5rem;
  padding: 1rem;
`;

export default DevicesContainer;

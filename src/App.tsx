import { useCallback, useState } from "react";
import { KeyDeviceMap, SensorName } from "./common/types";
import styled from "styled-components";
import { ISensorBooleanMap } from "./common/types";
import DevicesContainer from "./components/DevicesContainer";
import AppHeader from "./components/AppHeader";
import { useQueryParam } from "./components/SensorsPicker";

function SendMessage(oscAddress: string, value: number | string) {
  const data = {
    address: oscAddress,
    value: value
  };

  fetch("/osc", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify(data)
  }).catch((error) => {
    console.error("Error:", error);
  });
}

function App() {
  const [devices, setDevices] = useState<KeyDeviceMap>({});

  const [value, setQueryValue] = useQueryParam(
    "sensors",
    "accelerometer,gyroscope,rotation"
  );
  const sensorEnabledMap = value.split(",").reduce<ISensorBooleanMap>(
    function (acc: ISensorBooleanMap, sensor: string) {
      switch (sensor) {
        case SensorName.Accelerometer:
          return { ...acc, [SensorName.Accelerometer]: true };
        case SensorName.Gyroscope:
          return { ...acc, [SensorName.Gyroscope]: true };
        case SensorName.Rotation:
          return { ...acc, [SensorName.Rotation]: true };
        case SensorName.Temperature:
          return { ...acc, [SensorName.Temperature]: true };
        case SensorName.Humidity:
          return { ...acc, [SensorName.Humidity]: true };
        case SensorName.Pressure:
          return { ...acc, [SensorName.Pressure]: true };
        case SensorName.Gas:
          return { ...acc, [SensorName.Gas]: true };
        case SensorName.CO2:
          return { ...acc, [SensorName.CO2]: true };
        default:
          return acc;
      }
    },
    {
      [SensorName.Accelerometer]: false,
      [SensorName.Gyroscope]: false,
      [SensorName.Rotation]: false,
      [SensorName.Temperature]: false,
      [SensorName.Humidity]: false,
      [SensorName.Pressure]: false,
      [SensorName.Gas]: false,
      [SensorName.CO2]: false
    }
  );
  const setSensorEnabled = useCallback(
    function (sensor: SensorName, enabled: boolean) {
      setQueryValue(
        Object.entries<boolean>(
          Object.assign({}, sensorEnabledMap, {
            [sensor]: enabled
          }) as unknown as { [key: string]: boolean }
        )
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(",")
      );
    },
    [sensorEnabledMap, setQueryValue]
  );

  return (
    <StyledApp>
      <AppHeader
        setDevices={setDevices}
        devices={devices}
        sensorEnabledMap={sensorEnabledMap}
        setSensorEnabled={setSensorEnabled}
      />
      <DevicesContainer
        sendMessage={SendMessage}
        devices={devices}
        setDevices={setDevices}
        sensorEnabledMap={sensorEnabledMap}
      />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  background-color: #fafaff;
  font-family: "Ubuntu mono", monospace;
`;

export default App;

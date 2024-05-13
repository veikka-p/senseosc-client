import { useCallback, useMemo } from "react";
import { DeviceSchema } from "../common/constants";
import {
  IDeviceContainer,
  SensorName,
  ISensorBooleanMap
} from "../common/types";
import styled from "styled-components";
import { createDeviceDisconnector } from "../common/BluetoothUtils";
import Accelerometer from "./sensors/Accelerometer";
import Gyroscope from "./sensors/Gyroscope";
import Rotation from "./sensors/Rotation";
import Temperature from "./sensors/Temperature";
import Humidity from "./sensors/Humidity";
import Pressure from "./sensors/Pressure";
import Gas from "./sensors/Gas";
import CO2 from "./sensors/CO2";

type SensorToCharacteristicMap = {
  [key in SensorName]: JSX.Element | null;
};

function createSensorComponentCreator(
  sensorEnabledMap: ISensorBooleanMap,
  sendSensorMessage: (message: string, data: number) => void
) {
  return function (
    acc: SensorToCharacteristicMap,
    characteristic: BluetoothRemoteGATTCharacteristic
  ) {
    switch (characteristic.uuid) {
      case DeviceSchema.accelerometer.uuid:
        return {
          ...acc,
          [SensorName.Accelerometer]: sensorEnabledMap.accelerometer ? (
            <Accelerometer
              key={SensorName.Accelerometer}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.gyroscope.uuid:
        return {
          ...acc,
          [SensorName.Gyroscope]: sensorEnabledMap.gyroscope ? (
            <Gyroscope
              key={SensorName.Gyroscope}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.rotation.uuid:
        return {
          ...acc,
          [SensorName.Rotation]: sensorEnabledMap.rotation ? (
            <Rotation
              key={SensorName.Rotation}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      /*case DeviceSchema.led.uuid:
        return {
          ...acc,
          [SensorName.LED]: null
        };*/
      case DeviceSchema.temperature.uuid:
        return {
          ...acc,
          [SensorName.Temperature]: sensorEnabledMap.temperature ? (
            <Temperature
              key={SensorName.Temperature}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.humidity.uuid:
        return {
          ...acc,
          [SensorName.Humidity]: sensorEnabledMap.humidity ? (
            <Humidity
              key={SensorName.Humidity}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.pressure.uuid:
        return {
          ...acc,
          [SensorName.Pressure]: sensorEnabledMap.pressure ? (
            <Pressure
              key={SensorName.Pressure}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.co2.uuid:
        return {
          ...acc,
          [SensorName.CO2]: sensorEnabledMap.co2 ? (
            <CO2
              key={SensorName.CO2}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      case DeviceSchema.gas.uuid:
        return {
          ...acc,
          [SensorName.Gas]: sensorEnabledMap.gas ? (
            <Gas
              key={SensorName.Gas}
              characteristic={characteristic}
              sendMessage={sendSensorMessage}
            />
          ) : null
        };
      default:
        return acc;
    }
  };
}

function DeviceContainer({
  device,
  setDevices,
  sensorEnabledMap,
  deviceDataIndex,
  sendMessage
}: IDeviceContainer) {
  const path = device.path;
  const characteristics = device.characteristics;

  const sendSensorMessage = useCallback(
    function (message: string, data: number) {
      sendMessage(`${path}/${message}`, data);
    },
    [sendMessage, path]
  );

  const sensorComponents = useMemo(
    function () {
      return characteristics.reduce<SensorToCharacteristicMap>(
        createSensorComponentCreator(sensorEnabledMap, sendSensorMessage),
        {
          [SensorName.Accelerometer]: null,
          [SensorName.Gyroscope]: null,
          [SensorName.Rotation]: null,
          //[SensorName.LED]: null,
          [SensorName.Temperature]: null,
          [SensorName.Humidity]: null,
          [SensorName.Pressure]: null,
          [SensorName.CO2]: null,
          [SensorName.Gas]: null
        }
      );
    },
    [characteristics, sendSensorMessage, sensorEnabledMap]
  );

  return (
    <StyledDeviceContainer>
      <DeviceContainerHeader>
        <h2>{device.name}</h2>
        <p>{device.path}</p>
      </DeviceContainerHeader>
      <SensorDataContainer>
        {Object.values(sensorComponents).map(
          (sensorComponent) => sensorComponent
        )}
      </SensorDataContainer>
      <DeviceContainerControls>
        <button
          className="red-on-dark"
          onClick={createDeviceDisconnector(
            deviceDataIndex,
            device.gatt,
            setDevices
          )}
        >
          Disconnect
        </button>
      </DeviceContainerControls>
    </StyledDeviceContainer>
  );
}

const DeviceContainerControls = styled.div`
  margin-top: 1.5rem;
`;

const DeviceContainerHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SensorDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDeviceContainer = styled.div`
  color: #fff;
  border: none;
  background-color: #30343f;
  padding: 1.5rem 1.5rem;
  border-radius: 10px;
`;

export default DeviceContainer;

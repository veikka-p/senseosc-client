import { IPoint3D, ISensorComponent, SensorName } from "../../common/types";
import { useEffect, useState } from "react";
import { read3DPoint } from "../../common/DataViewUtils";
import {
  Data,
  DataContainer,
  DataLabel,
  SensorData,
  SensorValue,
  StyledSensorName
} from "./StyledComponents";

function Gyroscope({ characteristic, sendMessage }: ISensorComponent) {
  const [data, setData] = useState<IPoint3D>({ x: 0, y: 0, z: 0 });

  function onDataChanged(event: Event) {
    if (event.target === null) {
      return;
    }

    const eventCharacteristic =
      event.target as BluetoothRemoteGATTCharacteristic;
    const dataView = eventCharacteristic.value;

    if (typeof dataView === "undefined") {
      return;
    }

    if (dataView.byteLength < 12) {
      return;
    }

    setData(read3DPoint(dataView));
  }

  useEffect(() => {
    sendMessage(`${SensorName.Gyroscope}/x`, data.x);
    sendMessage(`${SensorName.Gyroscope}/y`, data.y);
    sendMessage(`${SensorName.Gyroscope}/z`, data.z);
  }, [data, sendMessage]);

  useEffect(() => {
    characteristic.startNotifications();
    characteristic.addEventListener(
      "characteristicvaluechanged",
      onDataChanged
    );

    return () => {
      characteristic.removeEventListener(
        "characteristicvaluechanged",
        onDataChanged
      );
    };
  }, [characteristic]);

  return (
    <SensorData className="multiline">
      <StyledSensorName>{SensorName.Gyroscope}:</StyledSensorName>
      <SensorValue>
        <DataContainer>
          <DataLabel> x:</DataLabel>
          <Data>{data.x.toFixed(0)}</Data>
        </DataContainer>
        <DataContainer>
          <DataLabel> y:</DataLabel>
          <Data>{data.y.toFixed(0)}</Data>
        </DataContainer>
        <DataContainer>
          <DataLabel> z:</DataLabel>
          <Data>{data.z.toFixed(0)}</Data>
        </DataContainer>
      </SensorValue>
    </SensorData>
  );
}

export default Gyroscope;

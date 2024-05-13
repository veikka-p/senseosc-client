/*import { IRGB, ISensorComponent, SensorName } from "../../common/types";
import { useEffect, useState } from "react";
import { readRGB } from "../../common/DataViewUtils";
import {
  Data,
  DataContainer,
  DataLabel,
  SensorData,
  SensorValue,
  StyledSensorName
} from "./StyledComponents";

function LED({ characteristic, sendMessage }: ISensorComponent) {
  const [data, setData] = useState<IRGB>({ r: 0, g: 0, b: 0 });

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

    setData(readRGB(dataView));
  }

  useEffect(() => {
    sendMessage(`${SensorName.LED}/R`, data.r);
    sendMessage(`${SensorName.LED}/G`, data.g);
    sendMessage(`${SensorName.LED}/B`, data.b);
  }, [data, sendMessage]);

  useEffect(() => {
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
      <StyledSensorName>{SensorName.LED}:</StyledSensorName>
      <SensorValue>
        <DataContainer>
          <DataLabel> R:</DataLabel>
          <Data>{data.r.toFixed(0)}</Data>
        </DataContainer>
        <DataContainer>
          <DataLabel> G:</DataLabel>
          <Data>{data.g.toFixed(0)}</Data>
        </DataContainer>
        <DataContainer>
          <DataLabel> B:</DataLabel>
          <Data>{data.b.toFixed(0)}</Data>
        </DataContainer>
      </SensorValue>
    </SensorData>
  );
}

export default LED;
*/

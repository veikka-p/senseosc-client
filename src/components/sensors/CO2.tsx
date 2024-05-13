import React, { useState, useEffect } from "react";
import { ISensorComponent, SensorName } from "../../common/types";
import { SensorData, SensorValue, StyledSensorName } from "./StyledComponents";
import { tryReadValue } from "../../common/DataViewUtils";

function CO2({ characteristic, sendMessage }: ISensorComponent) {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    const poller = async () => {
      const value = await tryReadValue(characteristic);
      if (value === null) {
        return;
      }
      try {
        if (value.byteLength < 4) {
          return;
        }
        setData(value.getUint32(0, true));
      } catch (error) {
        console.error("Error polling CO2:", error);
      }
    };

    const pollingInterval = setInterval(poller, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [characteristic]);

  useEffect(() => {
    if (data !== null) {
      sendMessage(`${SensorName.CO2}`, data);
    }
  }, [data, sendMessage]);

  return (
    <SensorData>
      <StyledSensorName>{SensorName.CO2}:</StyledSensorName>
      <SensorValue>{data !== null ? data : "--"} PPM</SensorValue>
    </SensorData>
  );
}

export default CO2;

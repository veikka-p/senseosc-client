import React, { useState, useEffect } from "react";
import { ISensorComponent, SensorName } from "../../common/types";
import { SensorData, SensorValue, StyledSensorName } from "./StyledComponents";
import { tryReadValue } from "../../common/DataViewUtils";

function Pressure({ characteristic, sendMessage }: ISensorComponent) {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    if (!characteristic) {
      return;
    }

    const poller = async () => {
      const value = await tryReadValue(characteristic);
      if (value === null) {
        return;
      }
      try {
        if (value.byteLength < 4) {
          return;
        }
        setData(value.getFloat32(0, true));
      } catch (error) {
        console.error("Error polling Pressure:", error);
      }
    };
    const pollingInterval = setInterval(poller, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [characteristic]);

  useEffect(() => {
    if (data !== null) {
      sendMessage(`${SensorName.Pressure}`, data);
    }
  }, [data, sendMessage]);

  return (
    <SensorData>
      <StyledSensorName>{SensorName.Pressure}:</StyledSensorName>
      <SensorValue>{data !== null ? data.toFixed(2) : "--"} hPa</SensorValue>
    </SensorData>
  );
}

export default Pressure;

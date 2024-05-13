import React, { useState, useEffect } from "react";
import { ISensorComponent, SensorName } from "../../common/types";
import { SensorData, SensorValue, StyledSensorName } from "./StyledComponents";
import { tryReadValue } from "../../common/DataViewUtils";

function Gas({ characteristic, sendMessage }: ISensorComponent) {
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
        console.error("Error polling Gas:", error);
      }
    };
    const pollingInterval = setInterval(poller, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [characteristic]);

  useEffect(() => {
    if (data !== null) {
      sendMessage(`${SensorName.Gas}`, data);
    }
  }, [data, sendMessage]);

  return (
    <SensorData>
      <StyledSensorName>{SensorName.Gas}:</StyledSensorName>
      <SensorValue>{data !== null ? data : "--"} PPM</SensorValue>
    </SensorData>
  );
}

export default Gas;

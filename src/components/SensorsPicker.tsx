import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ISensorBooleanMap, SensorName } from "../common/types";
import { DeviceSchema } from "../common/constants";

export function useWindowLocation() {
  const [windowLocation, setWindowLocation] = useState(window.location);

  function onLocationChange() {
    setWindowLocation(window.location);
  }

  useEffect(function () {
    window.addEventListener("popstate", onLocationChange);

    return function () {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return windowLocation;
}

export function useQueryParam(
  queryKey: string,
  defaultValue: string | null = null
): [string, (newValue: string) => void] {
  const [value, setValue] = useState<string | null>(null);

  const onLocationChange = useCallback(
    function () {
      setValue(new URLSearchParams(window.location.search).get(queryKey) || "");
    },
    [queryKey]
  );

  useEffect(
    function () {
      window.addEventListener("popstate", onLocationChange);

      return function () {
        window.removeEventListener("popstate", onLocationChange);
      };
    },
    [onLocationChange]
  );

  const setQueryValue = useCallback(
    function (newValue: string) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(queryKey, newValue);
      const queryValue = searchParams.get(queryKey);
      const newUrl =
        queryValue === null || queryValue.length === 0
          ? window.location.pathname
          : `${window.location.pathname}?${queryKey}=${searchParams.get(queryKey)}`;
      window.history.pushState({}, "", newUrl);
      setValue(newValue);
    },
    [queryKey]
  );

  useEffect(
    function () {
      if (
        new URLSearchParams(window.location.search).get(queryKey) === null &&
        defaultValue !== null
      ) {
        setQueryValue(defaultValue);
      }
    },
    [defaultValue, queryKey, setQueryValue]
  );

  return [value || "", setQueryValue];
}

interface ISensorsPicker {
  sensorEnabledMap: ISensorBooleanMap;
  setSensorEnabled: (sensor: SensorName, enabled: boolean) => void;
}

function SensorsPicker({ sensorEnabledMap, setSensorEnabled }: ISensorsPicker) {
  const deviceSchemas = Object.entries(DeviceSchema);
  const onChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      const checked = event.currentTarget.checked;

      if (typeof event.currentTarget.dataset.sensorname === "undefined") {
        return;
      }

      const sensorName: string = event.currentTarget.dataset.sensorname;

      setSensorEnabled(sensorName as SensorName, checked);
    },
    [setSensorEnabled]
  );

  return (
    <details>
      <summary>Pick Sensors</summary>
      <StyledSensorsPicker>
        {deviceSchemas.map(function ([deviceName]) {
          const value = sensorEnabledMap[deviceName as SensorName] ?? null;
          return value !== null ? (
            <SensorCheckboxContainer key={deviceName}>
              <input
                type="checkbox"
                data-sensorname={deviceName}
                name={`${deviceName}Enabled`}
                onChange={onChange}
                checked={value}
              />
              <label htmlFor={`${deviceName}Enabled`}>{deviceName}</label>
            </SensorCheckboxContainer>
          ) : (
            <></>
          );
        })}
      </StyledSensorsPicker>
    </details>
  );
}

const StyledSensorsPicker = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 0.25rem;
  column-gap: 0.5rem;
`;

const SensorCheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 0.5rem;
  & > label {
    text-transform: capitalize;
  }

  & > input {
    display: inline-block;
    margin-right: 0.25rem;
  }
`;

export default SensorsPicker;

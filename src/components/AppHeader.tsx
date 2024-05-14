import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { onDisconnectAll } from "../common/BluetoothUtils";
import { Connect } from "../common/Connect";
import { ISensorBooleanMap, KeyDeviceMap, SensorName } from "../common/types";
import SensorsPicker from "./SensorsPicker";
import Settings from "./Settings";

interface IAppHeader {
  sensorEnabledMap: ISensorBooleanMap;
  setSensorEnabled: (sensor: SensorName, enabled: boolean) => void;
  devices: KeyDeviceMap;
  setDevices: React.Dispatch<React.SetStateAction<KeyDeviceMap>>;
}

function AppHeader({
  devices,
  setDevices,
  sensorEnabledMap,
  setSensorEnabled
}: IAppHeader) {
  const deviceValues = useMemo(() => Object.values(devices), [devices]);

  async function onConnectDeviceButtonClick() {
    await Connect(setDevices);
  }

  const onDisconnectAllButtonClick = useCallback(
    function () {
      onDisconnectAll(devices, setDevices);
    },
    [devices, setDevices]
  );

  return (
    <StyledAppHeader>
      <Title>SenseOSC</Title>
      <ButtonsContainer>
        <button onClick={onConnectDeviceButtonClick}>Connect a device</button>
        {deviceValues.length > 0 && (
          <button className="red-on-light" onClick={onDisconnectAllButtonClick}>
            Disconnect All
          </button>
        )}
      </ButtonsContainer>
      <SensorsPicker
        sensorEnabledMap={sensorEnabledMap}
        setSensorEnabled={setSensorEnabled}
      />
      <Settings />
    </StyledAppHeader>
  );
}

const StyledAppHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  padding: 0rem 1rem 0rem 1rem;
  max-width: 20%;
  width: 20%;
  height: 100%;
  padding: 1rem;
`;

const Title = styled.h1`
  letter-spacing: 0.4rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #30343f;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export default AppHeader;

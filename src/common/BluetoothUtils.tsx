import React from "react";
import { DeviceKey, KeyDeviceMap } from "./types";

type BluetoothGatt = {
  disconnect: () => void;
};

type SetDevicesFunction = React.Dispatch<React.SetStateAction<KeyDeviceMap>>;

const createDeviceDisconnector =
  (
    deviceIndex: DeviceKey,
    gatt: BluetoothGatt,
    setDevices: SetDevicesFunction
  ) =>
  () => {
    gatt.disconnect();
    setDevices((oldDevices) =>
      Object.entries(oldDevices).reduce(
        (acc, [key, value]) =>
          key !== deviceIndex ? { ...acc, [key]: value } : acc,
        {}
      )
    );
  };

const onDisconnectAll = (
  devices: KeyDeviceMap,
  setDevices: SetDevicesFunction
) => {
  Object.entries(devices).forEach(([, { gatt }]) => {
    gatt.disconnect();
  });
  setDevices({});
};

export { createDeviceDisconnector, onDisconnectAll };

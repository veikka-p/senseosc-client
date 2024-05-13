import { DeviceSchema, UUID } from "./constants";
import { IDevice, KeyDeviceMap } from "./types";

const Sensors = Object.values(DeviceSchema);

export const Connect = async (
  setDevices: React.Dispatch<React.SetStateAction<KeyDeviceMap>>
) => {
  let device: BluetoothDevice | null = null;

  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [UUID] }],
      optionalServices: Sensors.map(({ uuid: sensorUUID }) => sensorUUID)
    });
  } catch (error) {
    console.log("Error requesting device or wrong browser.");
  }

  if (device === null) {
    return;
  }

  if (typeof device.gatt === "undefined") {
    console.log("Device does not support GATT");
    return;
  }
  let server: BluetoothRemoteGATTServer | null = null;
  let retryCount = 5;

  while (retryCount > 0) {
    try {
      server = await device.gatt.connect();
      break;
    } catch (error) {
      console.log("Error connecting to GATT server");
      retryCount--;
      if (retryCount === 0) {
        console.log("Failed to connect after multiple attempts.");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  if (server === null) {
    return;
  }

  let service: BluetoothRemoteGATTService | null = null;
  retryCount = 5;

  while (retryCount > 0) {
    try {
      service = await server.getPrimaryService(UUID);
      break;
    } catch (error) {
      console.log("Error retrieving service");
      retryCount--;
      if (retryCount === 0) {
        console.log("Failed to retrieve service after multiple attempts.");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  if (service === null) {
    return;
  }

  let characteristics: BluetoothRemoteGATTCharacteristic[] = [];
  try {
    characteristics = await service.getCharacteristics();
  } catch (error) {
    console.log("Could not get characteristics");
  }
  const devicePathId = device.name ?? device.id;

  const taikaBoxDevice: IDevice = {
    name: device.name ?? "",
    path: `/SenseOSC/${devicePathId}`,
    uuid: device.id,
    gatt: server,
    characteristics
  };

  setDevices((oldDevices) => ({
    ...oldDevices,
    [devicePathId]: taikaBoxDevice
  }));
};

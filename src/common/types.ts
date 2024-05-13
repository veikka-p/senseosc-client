export interface IDevice {
  name: string;
  uuid: string;
  path: string;
  gatt: BluetoothRemoteGATTServer;
  characteristics: BluetoothRemoteGATTCharacteristic[];
}
export interface SensorConfig<T> {
  uuid: string;
  properties: string[];
  structure: string[];
  data: T;
}

export interface IDeviceContainer {
  device: IDevice;
  deviceDataIndex: DeviceKey;
  sensorEnabledMap: ISensorBooleanMap;
  sendMessage: (message: string, data: number) => void;
  setDevices: React.Dispatch<React.SetStateAction<KeyDeviceMap>>;
}

export interface ISensorsData {
  [SensorName.Temperature]: number;
  [SensorName.Humidity]: number;
  [SensorName.Pressure]: number;
  [SensorName.Accelerometer]: IPoint3D;
  [SensorName.Gyroscope]: IPoint3D;
  //[SensorName.LED]: IRGB;
  [SensorName.Rotation]: IPoint3D;
  [SensorName.CO2]: number;
  [SensorName.Gas]: number;
}

export interface IDeviceSchema {
  [SensorName.Temperature]: SensorConfig<ITemperatureData>;
  [SensorName.Humidity]: SensorConfig<IHumidityData>;
  [SensorName.Pressure]: SensorConfig<IPressureData>;
  [SensorName.Accelerometer]: SensorConfig<IAccelerometerData>;
  [SensorName.Gyroscope]: SensorConfig<IGyroscopeData>;
  //[SensorName.LED]: SensorConfig<ILedData>;
  [SensorName.Rotation]: SensorConfig<IRotationData>;
  [SensorName.CO2]: SensorConfig<ICo2Data>;
  [SensorName.Gas]: SensorConfig<IGasData>;
}

//Temperature
export interface ITemperatureData {
  temperature: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Humidity
export interface IHumidityData {
  humidity: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Pressure
export interface IPressureData {
  pressure: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Accelerometer
export interface IAccelerometerData {
  x: number[];
  y: number[];
  z: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Gyroscope
export interface IGyroscopeData {
  x: number[];
  y: number[];
  z: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Led
export interface ILedData {
  r: number[];
  g: number[];
  b: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

export interface IRGB {
  r: number;
  g: number;
  b: number;
}

// Rotation
export interface IRotationData {
  x: number[];
  y: number[];
  z: number[];
  w: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Co2
export interface ICo2Data {
  co2: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

// Gas
export interface IGasData {
  gas: number[];
  writeBusy: boolean;
  writeValue: number | null;
}

export enum SensorName {
  Temperature = "temperature",
  Humidity = "humidity",
  Pressure = "pressure",
  Accelerometer = "accelerometer",
  Gyroscope = "gyroscope",
  Rotation = "rotation",
  CO2 = "co2",
  Gas = "gas"
  /*LED = "led"*/
}

export interface ISensorBooleanMap {
  [SensorName.Temperature]: boolean;
  [SensorName.Humidity]: boolean;
  [SensorName.Pressure]: boolean;
  [SensorName.Accelerometer]: boolean;
  [SensorName.Gyroscope]: boolean;
  [SensorName.Rotation]: boolean;
  [SensorName.CO2]: boolean;
  [SensorName.Gas]: boolean;
  //[SensorName.LED]: boolean;
}

export type DeviceKey = number | string;

export type KeyDeviceMap = {
  [key: DeviceKey]: IDevice;
};

export interface IPoint3D {
  x: number;
  y: number;
  z: number;
}

export interface ISensorComponent {
  characteristic: BluetoothRemoteGATTCharacteristic;
  sendMessage: (message: string, data: number) => void;
}

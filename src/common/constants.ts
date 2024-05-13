import {
  IDeviceSchema,
  ISensorBooleanMap,
  ISensorsData,
  SensorName
} from "./types";

export const UUID = "19b10000-0000-537e-4f6c-d104768a1214";
export const WebSocketPort = "1234";
export const WebSocketURL = "ws://localhost:8080";

export const DefaultSensorData: ISensorsData = {
  [SensorName.Temperature]: 0,
  [SensorName.Humidity]: 0,
  [SensorName.Pressure]: 0,
  [SensorName.Accelerometer]: { x: 0, y: 0, z: 0 },
  [SensorName.Gyroscope]: { x: 0, y: 0, z: 0 },
  //[SensorName.LED]: { r: 0, g: 0, b: 0 },
  [SensorName.Rotation]: { x: 0, y: 0, z: 0 },
  [SensorName.CO2]: 0,
  [SensorName.Gas]: 0
};

export const DefaultSensorEnabledMap: ISensorBooleanMap = {
  [SensorName.Temperature]: true,
  [SensorName.Humidity]: true,
  [SensorName.Pressure]: true,
  [SensorName.Accelerometer]: true,
  [SensorName.Gyroscope]: true,
  [SensorName.Rotation]: true,
  [SensorName.CO2]: true,
  [SensorName.Gas]: true
  //[SensorName.LED]: true
};

export const DeviceSchema: IDeviceSchema = {
  [SensorName.Temperature]: {
    uuid: "19b10000-2001-537e-4f6c-d104768a1214",
    properties: ["BLERead"],
    structure: ["Float32"],
    data: {
      temperature: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.Humidity]: {
    uuid: "19b10000-3001-537e-4f6c-d104768a1214",
    properties: ["BLERead"],
    structure: ["Uint8"],
    data: {
      humidity: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.Pressure]: {
    uuid: "19b10000-4001-537e-4f6c-d104768a1214",
    properties: ["BLERead"],
    structure: ["Float32"],
    data: {
      pressure: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.Accelerometer]: {
    uuid: "19b10000-5001-537e-4f6c-d104768a1214",
    properties: ["BLENotify"],
    structure: ["Float32", "Float32", "Float32"],
    data: {
      x: [],
      y: [],
      z: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.Gyroscope]: {
    uuid: "19b10000-6001-537e-4f6c-d104768a1214",
    properties: ["BLENotify"],
    structure: ["Float32", "Float32", "Float32"],
    data: {
      x: [],
      y: [],
      z: [],
      writeBusy: false,
      writeValue: null
    }
  },
  /*[SensorName.LED]: {
    uuid: "19b10000-8001-537e-4f6c-d104768a1214",
    properties: ["BLEWrite"],
    structure: ["Uint8", "Uint8", "Uint8"],
    data: {
      r: [],
      g: [],
      b: [],
      writeBusy: false,
      writeValue: null
    }
  },*/
  [SensorName.Rotation]: {
    uuid: "19b10000-7001-537e-4f6c-d104768a1214",
    properties: ["BLENotify"],
    structure: ["Float32", "Float32", "Float32", "Float32"],
    data: {
      x: [],
      y: [],
      z: [],
      w: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.CO2]: {
    uuid: "19b10000-9002-537e-4f6c-d104768a1214",
    properties: ["BLERead"],
    structure: ["Uint32"],
    data: {
      co2: [],
      writeBusy: false,
      writeValue: null
    }
  },
  [SensorName.Gas]: {
    uuid: "19b10000-9003-537e-4f6c-d104768a1214",
    properties: ["BLERead"],
    structure: ["Uint32"],
    data: {
      gas: [],
      writeBusy: false,
      writeValue: null
    }
  }
};

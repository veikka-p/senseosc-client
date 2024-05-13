import * as THREE from "three";
import { IPoint3D, IRGB } from "./types";

export function readRGB(dataView: DataView): IRGB {
  return {
    r: dataView.getUint8(0),
    g: dataView.getUint8(1),
    b: dataView.getUint8(2)
  };
}

export function read3DPoint(dataView: DataView): IPoint3D {
  const x = dataView.getFloat32(0, true);
  const y = dataView.getFloat32(4, true);
  const z = dataView.getFloat32(8, true);
  return { x, y, z };
}

export function readQuaternionAs3DPoint(dataView: DataView): IPoint3D {
  const x = dataView.getFloat32(0, true);
  const y = dataView.getFloat32(4, true);
  const z = dataView.getFloat32(8, true);
  const w = dataView.getFloat32(12, true);
  const quaternion = new THREE.Quaternion(x, y, z, w);
  quaternion.normalize();
  const rotation = new THREE.Euler().setFromQuaternion(quaternion, "ZYX");
  rotation.x = Math.round((rotation.x * 180) / Math.PI + 180);
  rotation.y = Math.round((rotation.y * 180) / Math.PI + 180);
  rotation.z = Math.round((rotation.z * 180) / Math.PI + 180);
  return { x: rotation.x, y: rotation.y, z: rotation.z };
}

export async function tryReadValue(
  characteristic: BluetoothRemoteGATTCharacteristic
): Promise<DataView | null> {
  try {
    return await characteristic.readValue();
  } catch (error) {
    return null;
  }
}

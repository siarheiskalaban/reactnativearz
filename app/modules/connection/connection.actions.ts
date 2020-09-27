import {CONNECTION_TYPES} from './connection.types';
import {
  RNSerialport,
  definitions,
  actions,
  IOnServiceStarted,
  IOnError,
  IOnReadData,
} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';

const handleServiceStarted = (response: IOnServiceStarted) => {};

const handleServiceStopped = () => {};

const handleDeviceAttached = () => {};

const handleDeviceDetached = () => {};

const handleConnected = () => {};

const handleDisconnected = () => {};

const handleError = (error: IOnError) => {};

const handleReadData = (data: IOnReadData) => {};

const detachListeners = async () => {
  DeviceEventEmitter.removeAllListeners();
  if (await RNSerialport.isOpen()) {
    RNSerialport.disconnect();
  }
  RNSerialport.stopUsbService();
};

const stopUsbService = () => {
  DeviceEventEmitter.addListener(
    actions.ON_SERVICE_STARTED,
    handleServiceStarted,
  );

  DeviceEventEmitter.addListener(
    actions.ON_SERVICE_STOPPED,
    handleServiceStopped,
  );

  DeviceEventEmitter.addListener(
    actions.ON_DEVICE_ATTACHED,
    handleDeviceAttached,
  );
  DeviceEventEmitter.addListener(
    actions.ON_DEVICE_DETACHED,
    handleDeviceDetached,
  );
  DeviceEventEmitter.addListener(actions.ON_ERROR, handleError);
  DeviceEventEmitter.addListener(actions.ON_CONNECTED, handleConnected);
  DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, handleDisconnected);
  DeviceEventEmitter.addListener(actions.ON_READ_DATA, handleReadData);
};

const startUsbService = () => {
  RNSerialport.setInterface(-1);
  RNSerialport.setReturnedDataType(
    definitions.RETURNED_DATA_TYPES.HEXSTRING as any,
  );
  RNSerialport.setAutoConnectBaudRate(9600);
  RNSerialport.setAutoConnect(true);
  RNSerialport.startUsbService();
};

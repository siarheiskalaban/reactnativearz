import {CONNECTION_TYPES} from './connection.types';
import {
  RNSerialport,
  definitions,
  actions,
  IOnError,
  IOnServiceStarted,
} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import {push} from 'connected-react-router';
import store from '../../configureStore';
import {usb} from '../../core';

const m = {
  connected: (displayName: string) => ({
    type: CONNECTION_TYPES.CONNECTED,
    displayName,
  }),
  disconnected: () => ({type: CONNECTION_TYPES.DISCONNECTED}),
  attached: (deviceName: string) => ({
    type: CONNECTION_TYPES.ATTACHED,
    deviceName,
  }),
  detached: () => ({type: CONNECTION_TYPES.DETACHED}),
};

const handleConnected = async () => {
  console.log('connected');

  await usb.warmup();
  console.log('SEND WHO YOU ARE?');
  const {payload} = await usb.sendAndWait('WHOAREYOU');
  store.dispatch(m.connected(payload));
  store.dispatch(push('/device'));
};

const handleDisconnected = () => {
  console.log('disconnected');

  store.dispatch(m.disconnected());
  store.dispatch(push('/'));
};

const handleAttached = async () => {
  console.log('attached');

  const devices = await RNSerialport.getDeviceList();
  store.dispatch(m.attached(devices[0].name));
};

const handleDetached = () => {
  console.log('detached');
  store.dispatch(m.detached());
};

const handleServiceStarted = (payload: IOnServiceStarted) => {
  console.log('Service started');

  if (!payload.deviceAttached) {
    return;
  }

  handleAttached();
};

const handleError = (error: IOnError) => {
  console.log(error);
};

const connect = () => async (_, getState) => {
  const deviceName = getState().connection.deviceName;

  RNSerialport.connectDevice(deviceName, 9600);
};

const send = (value: string) => {
  RNSerialport.writeString(value);
};

const handleData = (data) => {
  const payload = RNSerialport.hexToUtf16(data.payload);
  usb.handleData(payload);
};

export const connectionActions = {
  connect,
  send,
};

export const stopUsbService = async () => {
  DeviceEventEmitter.removeAllListeners();
  if (await RNSerialport.isOpen()) {
    RNSerialport.disconnect();
  }
  RNSerialport.stopUsbService();
};

export const startUsbService = () => {
  console.log('Attempt to start usb service');

  DeviceEventEmitter.addListener(actions.ON_ERROR, handleError);
  DeviceEventEmitter.addListener(actions.ON_CONNECTED, handleConnected);
  DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, handleDisconnected);
  DeviceEventEmitter.addListener(
    actions.ON_SERVICE_STARTED,
    handleServiceStarted,
    this,
  );
  DeviceEventEmitter.addListener(actions.ON_DEVICE_ATTACHED, handleAttached);
  DeviceEventEmitter.addListener(actions.ON_DEVICE_DETACHED, handleDetached);
  DeviceEventEmitter.addListener(actions.ON_READ_DATA, handleData);

  RNSerialport.setReturnedDataType(
    definitions.RETURNED_DATA_TYPES.HEXSTRING as any,
  );
  RNSerialport.setAutoConnect(false);
  RNSerialport.startUsbService();
};

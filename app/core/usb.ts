import shortid from 'shortid';
import {RNSerialport} from 'react-native-serialport';

const DELIMETER = ';';
const MARKER = 'ARZ';

export interface UsbResponse {
  id: string;
  kind: string;
  payload: string | null;
}

export interface UsbSubscription {
  dispose: () => void;
}

class Usb {
  private _chunk = '';
  private _dataRegEx = new RegExp(
    `${MARKER}${DELIMETER}([^${DELIMETER}]+)${DELIMETER}([^${DELIMETER}]+)${DELIMETER}([^${DELIMETER}]*)${DELIMETER}`,
    'gi',
  );
  private _resolvers = new Map<string, (response: UsbResponse) => any>();
  private _subscribers = new Map<string, (response: UsbResponse) => any>();

  public subscribe = (fn: (response: UsbResponse) => any): UsbSubscription => {
    const id = shortid();
    this._subscribers.set(id, fn);

    return {
      dispose: () => this._subscribers.delete(id),
    };
  };

  public subscribeKind = (
    kind: string,
    fn: (response: UsbResponse) => any,
  ): UsbSubscription => {
    const predicatedFn = (r: UsbResponse) => {
      r.kind === kind && fn(r);
    };
    return this.subscribe(predicatedFn);
  };

  public handleData = (data: string) => {
    this._chunk += data;

    const found = this._dataRegEx.exec(this._chunk);

    if (found) {
      debugger;
      this.processData(found);
      const index = this._chunk.indexOf(found[0]);
      this._chunk = this._chunk.substring(index + found[0].length);
    }
  };

  private processData = ([, id, kind, payload]: string[]) => {
    const response = {
      id,
      kind,
      payload: payload === '' ? null : payload,
    };

    this._subscribers.forEach((subscriber) => subscriber(response));

    if (!this._resolvers.has(id)) {
      return;
    }

    const resolver = this._resolvers.get(id);
    resolver(response);
  };

  public sendAndWait = (
    kind: string,
    payload?: string,
  ): Promise<UsbResponse> => {
    const id = shortid();

    return new Promise((resolve) => {
      this._resolvers.set(id, resolve);
      RNSerialport.writeString(this.serialize(id, kind, payload));
    });
  };

  private serialize = (id: string, kind: string, payload?: string) => {
    payload = !payload ? '' : payload;

    return `${MARKER}${DELIMETER}${id}${DELIMETER}${kind}${DELIMETER}${payload}${DELIMETER}`;
  };
}

export const usb = new Usb();

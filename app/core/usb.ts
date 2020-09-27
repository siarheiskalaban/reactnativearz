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

    console.log("CHUNK: " + this._chunk);

    if (found) {
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

    console.log('received', response);

    this._subscribers.forEach((subscriber) => subscriber(response));

    if (!this._resolvers.has(id)) {
      return;
    }

    const resolver = this._resolvers.get(id);
    resolver(response);
  };

  public warmup = () => {
    console.log('Warmup called');

    return new Promise((resolve) => {
      const id = shortid();
      let finished = false;

      const subscription = this.subscribeKind("STATUS", () => {
        finished = true;
        resolve();
        subscription.dispose();
      })

      const tick = () => {
        console.log(`Finished = ${finished}`);

        if (finished) return;

        console.log('Sending warmup!');
        RNSerialport.writeString(this.serialize(id, "STATUS"));
        setTimeout(() => tick(), 2500);
      }
      
      setTimeout(() => tick(), 0);
    });
  }

  public sendAndWait = (
    kind: string,
    payload?: string,
  ): Promise<UsbResponse> => {
    const id = shortid();

    return new Promise((resolve) => {
      this._resolvers.set(id, resolve);

      setTimeout(() => RNSerialport.writeString(this.serialize(id, kind, payload)), 0);
    });
  };

  private serialize = (id: string, kind: string, payload?: string) => {
    payload = !payload ? '' : payload;

    return `${MARKER}${DELIMETER}${id}${DELIMETER}${kind}${DELIMETER}${payload}${DELIMETER}`;
  };
}

export const usb = new Usb();

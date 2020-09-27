import React, {PropsWithChildren} from 'react';
import shortid from 'shortid';

const DELEGATE_ID = Symbol('__DELEGATE__');

class ReactUtil {
  public delegate<T>(): React.ComponentType<PropsWithChildren<T>> {
    const Delegate = (props: PropsWithChildren<T>) => <></>;
    Delegate[DELEGATE_ID] = this.generateDelegateId();
    return Delegate;
  }

  public delegateProps<
    T extends React.ComponentType<TProps>,
    TProps extends any
  >(Delegate: T, children: any) {
    const delegate: any = this.findDelegateById(children, Delegate[DELEGATE_ID]);
    return delegate && delegate.props;
  }

  private findDelegateById(children: any, id: string) {
    return React.Children.toArray(children).find(
      (c: any) => c && c.type && c.type[DELEGATE_ID] === id,
    );
  }

  private generateDelegateId = () => {
    return `Delegate-${shortid.generate()}`;
  };
}

const reactUtil = new ReactUtil();
export default reactUtil;

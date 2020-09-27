import { StyleProvider } from 'native-base';
import { PropsWithChildren } from 'react';

export const StyleTheme = ({ children }: PropsWithChildren<{}>) => {
  return (
    <StyleProvider style={
      {
        brandPrimary: "#212121"
      }
    }>
      {children}
    </StyleProvider>
  )
}
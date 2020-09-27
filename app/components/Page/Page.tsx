import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import reactUtil from '../../utils/reactUtil';
import {PageHeader, PageHeaderProps} from './PageHeader';
import {Container, Content, Text} from 'native-base';

type PageProps = PropsWithChildren<{}>;

const PageBodyDelegate = reactUtil.delegate();
const PageHeaderDelegate = reactUtil.delegate<PageHeaderProps>();

type PageComponent = React.ComponentType<PageProps> & {
  Body: typeof PageBodyDelegate;
  Header: typeof PageHeaderDelegate;
};

class _Page extends React.Component {
  public render() {
    const pageHeaderProps =
      reactUtil.delegateProps(PageHeaderDelegate, this.props.children) || {};
    const pageBodyProps =
      reactUtil.delegateProps(PageBodyDelegate, this.props.children) || {};

    return (
      <Container>
        <PageHeader {...pageHeaderProps} />
        <Content>
          <Text>Blah blah</Text>
          {/* <View>{pageBodyProps.children}</View> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AnyPage: any = _Page;
AnyPage.Body = PageBodyDelegate;
AnyPage.Header = PageHeaderDelegate;

export const Page: PageComponent = AnyPage;

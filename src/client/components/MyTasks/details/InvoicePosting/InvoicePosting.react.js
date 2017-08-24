import React from 'react';

import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class Posting extends React.Component {
  componentWillMount() {
    const serviceRegistry = (service) => ({
      url: `${window.location.origin}/posting`
    });
    const PostingGrid = serviceComponent({
      serviceRegistry,
      serviceName: 'posting',
      moduleName: 'posting-grid',
      jsFileName: 'grid-bundle'
    });

    this.externalComponents = { PostingGrid };
  }
  render() {
    const { PostingGrid } = this.externalComponents;
    return (
      <PostingGrid />
    );
  }
}

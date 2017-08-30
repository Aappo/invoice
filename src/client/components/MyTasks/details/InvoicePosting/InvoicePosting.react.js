import React, {Component} from 'react';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

const PostingGrid = serviceComponent({
  serviceRegistry: (service) => ({ url: '/posting' }),
  serviceName: 'posting',
  moduleName: 'posting-grid',
  jsFileName: 'grid-bundle'
});

export default class Posting extends Component {
  render() {
    return (
      <PostingGrid />
    );
  }
}

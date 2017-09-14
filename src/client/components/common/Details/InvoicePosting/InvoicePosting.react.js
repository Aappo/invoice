import React, { Component, PropTypes } from 'react';
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
      <PostingGrid invoice={this.props.invoice}/>
    );
  }
}

Posting.propTypes = {
  invoice: PropTypes.object.isRequired
};

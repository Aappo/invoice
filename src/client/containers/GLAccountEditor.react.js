import React, { PropTypes, Component } from 'react';
import GlAccountEditorWrapper from '../components/GLAccountEditor';
import request from 'superagent-bluebird-promise';
import lodash from 'lodash';
import messages from './i18n/GlAccountEditor';
import contentRange from 'content-range';

export default class GLAccountEditor extends Component {

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  state = {
    showCreateForm: false, // controls open/closed state of create form
    modals: { // controls state of search form corresponding modals (delete, edit)
      edit: false,
      delete: false
    },
    glAccountToModify: undefined, // holds the gl account that is going to be modified (e.g. deleted or updated)
    glAccounts: [], // list of the gl accounts to display in search form
    errors: { create: {}, edit: {} }
  };

  componentWillMount() {
    this.context.i18n.register('GLAccountEditor', messages);
  }

  handleOpenModal(modalName, glAccount) {
    this.setState({
      modals: {
        ...this.state.modals,
        [modalName]: true
      },
      glAccountToModify: glAccount
    })
  }

  handleCloseModal(modalName) {
    this.setState({
      modals: {
        ...this.state.modals,
        [modalName]: false
      },
      glAccountToModify: undefined
    })
  }

  handleSearchGlAccounts(searchParams, offset = 0, count = 5) {
    return request.get('/invoice/api/glAccounts').set(
      'Accept', 'application/json'
    ).query(searchParams).query({ offset, count }).then((response) => {
      this.setState(
        {
          glAccounts: response.body,
          pagination: contentRange.parse(response.header['content-range'])
        })
    })
  }

  handleCreateGlAccount(glAccount, reset, invalidateForm) {
    return request.post('/invoice/api/glAccounts').set(
      'Accept', 'application/json'
    ).send(glAccount).then((response) => Promise.resolve(
      this.setState({
        glAccounts: lodash.concat(this.state.glAccounts, response.body)
      })
    )).then(() => reset()
    ).catch((response) => {
      if (lodash.get(response, 'body.errors[0].field') === 'PRIMARY') {
        invalidateForm({ id: 'GlAccount.isUnique' });
      } else {
        throw Error(response);
      }
    })
  }

  handleUpdateGlAccount(glAccountData) {
    return request.put(`/invoice/api/glAccounts/${glAccountData.id}`).set(
      'Accept', 'application/json'
    ).send(glAccountData).then((response) => {
      this.setState({
        glAccounts: lodash.map(this.state.glAccounts, (glAccount) => {
          if (glAccount.id === glAccountData.id) {
            return response.body;
          } else {
            return glAccount;
          }
        }),
        modals: {
          ...this.state.modals,
          edit: false
        },
        glAccountToModify: undefined
      });
    })
  }

  handleDeleteGlAccount(id) {
    request.delete(`/invoice/api/glAccounts/${id}`).set(
      'Accept', 'application/json'
    ).then((response) => {
      this.setState({
        modals: {
          ...this.state.modals,
          delete: false
        },
        glAccounts: lodash.reject(this.state.glAccounts, { id: id })
      });
    })
  }


  changeDeleteModalDisplayMode() {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  }

  changeEditModalDisplayMode() {
    this.setState({ showEditModal: !this.state.showEditModal });
  }

  render() {
    return (
      <GlAccountEditorWrapper
        glAccounts={this.state.glAccounts}
        glAccountToModify={this.state.glAccountToModify}
        modals={this.state.modals}
        onGlAccountSearch={::this.handleSearchGlAccounts}
        onCreateGlAccount={::this.handleCreateGlAccount}
        onDeleteGlAccount={::this.handleDeleteGlAccount}
        onUpdateGlAccount={::this.handleUpdateGlAccount}
        onOpenModal={::this.handleOpenModal}
        onCloseModal={::this.handleCloseModal}
        pagination={this.state.pagination}
      />
    );
  }
}

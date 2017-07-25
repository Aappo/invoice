import React, { PropTypes } from 'react';
import lodash from 'lodash';
import { Button, Table, Glyphicon } from 'react-bootstrap';
import DeleteModal from './DeleteModal.react';
import EditModal from './EditModal.react';

const SearchResult = ({
  glAccounts,
  glAccountToModify,
  onDelete,
  modals,
  onOpenModal,
  onCloseModal,
  onUpdate
}, {
  i18n
}) => {
  if (lodash.size(glAccounts) === 0) {
    return (
      <div className="bs-callout bs-callout-default">
        {i18n.getMessage('GlAccount.noItems')}
      </div>
    );
  } else {
    return (
      <Table responsive={true}>
        <thead>
        <tr>
          <th className="text-nowrap">{i18n.getMessage('GlAccount.id')}</th>
          <th className="text-nowrap">{i18n.getMessage('GlAccount.shortDescription')}</th>
          <th className="text-nowrap"/>
        </tr>
        </thead>
        <tbody>
        {
          glAccounts.map((glAccount) => {
            return (
              <tr key={glAccount.id}>
                <td>
                  {glAccount.id}
                </td>
                <td>
                  {glAccount.shortDescription}
                </td>
                <td className="text-right">
                  <div className="btn-group">
                    <Button onClick={() => (onOpenModal('edit', glAccount))}>
                      <Glyphicon glyph="edit"/>
                      {i18n.getMessage('GlAccount.editButton')}
                    </Button>
                    <Button onClick={() => (onOpenModal('delete', glAccount))}>
                      <Glyphicon glyph="trash"/>
                      {i18n.getMessage('GlAccount.deleteButton')}
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })
        }
        </tbody>
        <DeleteModal
          onDelete={() => {onDelete(glAccountToModify.id)}}
          onHide={() => (onCloseModal('delete'))}
          display={modals.delete}
        />
        <EditModal
          glAccount={glAccountToModify}
          onUpdate={onUpdate}
          onHide={() => (onCloseModal('edit'))}
          display={modals.edit}
        />
      </Table>
    );
  }
};

SearchResult.propTypes = {
  glAccounts: PropTypes.array,
  glAccountToModify: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  modals: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

SearchResult.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default SearchResult;

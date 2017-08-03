"use strict";

const assert = require('assert');
const actions = require('./actions');

describe("Approval workflow actions:", () => {
  it('correctly updates comment', () => {
    let object = { comment: "initial_comment" };

    actions.updateComment(
      {
        object,
        commentFieldName: 'comment',
        request: { comment: 'new_comment' }
      }
    );
    assert.equal(object.comment, 'new_comment');
  });

  it('does nothing in case empty or null request', () => {
    let object = { comment: "initial_comment" };

    actions.updateComment(
      {
        object,
        commentFieldName: 'comment',
        request: {}
      }
    );

    assert.equal(object.comment, 'initial_comment');

    actions.updateComment(
      {
        object,
        commentFieldName: 'comment',
      }
    );

    assert.equal(object.comment, 'initial_comment');

    actions.updateComment(
      {
        object,
        commentFieldName: 'comment',
        request: {comment: null}
      }
    );

    assert.equal(object.comment, 'initial_comment');
  });
});

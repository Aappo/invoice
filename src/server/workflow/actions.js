module.exports = {
  updateComment: ({object, commentFieldName, request  = {}}) => {
    object[commentFieldName] = request.comment? request.comment : object[commentFieldName];
  },
  updateProcessedBy: ({object, processedByFieldName, userId, request = {}}) => {
    if (typeof userId !== 'undefined') {
      object[processedByFieldName] = userId;
    } else {
      object[processedByFieldName] = request.userId;
    }
  }
};

module.exports = {
  updateProcessedBy: ({object, processedByFieldName, userId, request = {}}) => {
    if (typeof userId !== 'undefined') {
      object[processedByFieldName] = userId;
    } else {
      object[processedByFieldName] = request.userId;
    }
  }
};

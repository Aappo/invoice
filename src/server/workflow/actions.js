module.exports = {
  updateComment: ({object, commentFieldName, request  = {}}) => {
    object[commentFieldName] = request.comment? request.comment : object[commentFieldName];
  }
};

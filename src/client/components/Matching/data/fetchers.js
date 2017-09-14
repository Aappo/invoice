import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';

export const fetchMatchingTasks = () => {
  return request.get('/invoice/api/matching/tasks').then((response) => Promise.resolve(response.body)
  ).catch((error) => {
    throw Error(error);
  })
};

export const fetchMatchingTask = (id) => {
  return request.get(`/invoice/api/matching/tasks/${id}`).then((response) => Promise.resolve(response.body)
  ).catch((error) => {
    throw Error(error);
  })
};

export const fetchMatchingTaskInfo = (id) => {
  return request.head(`/invoice/api/matching/tasks/${id}`).then((response) => JSON.parse(response.headers['x-matching-info'])
  ).catch((error) => {
    throw Error(error);
  })
};

import React, { Component, PropTypes } from 'react';

import TaskLayoutHandler from './TaskLayoutHandler.react';

const AllTasksView = () => <TaskLayoutHandler />;
const MyTasksView = () => <TaskLayoutHandler assignedToMe={true} />;

export { AllTasksView, MyTasksView };

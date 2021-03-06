import attachAction from './AttachAction';
import createSnapshotAction from './CreateSnapshotAction';
import createSnapshotScheduleAction from './CreateSnapshotScheduleAction';
import destroyAction from './DestroyAction';
import detachAction from './DetachAction';
import editAction from './EditAction';
import extendAction from './ExtendAction';
import pullAction from './PullAction';
import retypeAction from './RetypeAction';

export default [
  editAction,
  pullAction,
  attachAction,
  detachAction,
  extendAction,
  retypeAction,
  destroyAction,
  createSnapshotAction,
  createSnapshotScheduleAction,
];

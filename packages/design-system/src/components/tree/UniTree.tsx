import { Tree } from 'antd';
import type { DirectoryTreeProps, TreeProps } from 'antd/es/tree';
import type { DataNode } from 'antd/es/tree';
import classNames from 'classnames';

export type UniTreeProps<T extends DataNode = DataNode> = TreeProps<T> & {
  class?: string;
};

export type UniDirectoryTreeProps<T extends DataNode = DataNode> = DirectoryTreeProps<T> & {
  class?: string;
};

export const UniTree = <T extends DataNode = DataNode>({ className, class: legacyClass, ...rest }: UniTreeProps<T>) => {
  return <Tree<T> className={classNames(className, legacyClass)} {...rest} />;
};

export const UniTreeNode: any = Tree.TreeNode;

export const UniDirectoryTree = <T extends DataNode = DataNode>({ className, class: legacyClass, ...rest }: UniDirectoryTreeProps<T>) => {
  return <Tree.DirectoryTree<T> className={classNames(className, legacyClass)} {...rest} />;
};

export type {
  TreeProps,
  DirectoryTreeProps,
  AntTreeNodeMouseEvent,
  AntTreeNodeExpandedEvent,
  AntTreeNodeCheckedEvent,
  AntTreeNodeSelectedEvent,
} from 'antd/es/tree';

import { Access } from 'payload/types';

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin');
};

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role === 'admin' || user.role === 'editor';
};

export const isPublic: Access = () => true;

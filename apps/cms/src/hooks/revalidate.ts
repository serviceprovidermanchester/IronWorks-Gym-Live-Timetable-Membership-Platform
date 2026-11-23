import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types';

export const revalidateTimetableAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  req.payload.logger.info(`Class timetable updated: "${doc.name}". Triggering cache revalidation...`);
  // If API url is configured, send webhook to flush Redis cache
  const apiUrl = process.env.API_URL || 'http://localhost:4000/v1';
  try {
    await fetch(`${apiUrl}/classes/revalidate`, { method: 'POST' }).catch(() => {});
  } catch {}
  return doc;
};

export const revalidateTimetableAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  req.payload.logger.info(`Class removed from timetable: "${doc.name}". Triggering cache revalidation...`);
  const apiUrl = process.env.API_URL || 'http://localhost:4000/v1';
  try {
    await fetch(`${apiUrl}/classes/revalidate`, { method: 'POST' }).catch(() => {});
  } catch {}
  return doc;
};

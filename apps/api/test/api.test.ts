import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index';

describe('IronWorks Gym API — Core Endpoints', () => {
  it('GET /health returns 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('ironworks-api');
    expect(res.body.built_by).toBe('SPManchester Private Limited');
  });

  it('GET /v1/classes returns 200 and array of active classes', async () => {
    const res = await request(app).get('/v1/classes');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /v1/memberships/plans returns 200 and list of active tiers', async () => {
    const res = await request(app).get('/v1/memberships/plans');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

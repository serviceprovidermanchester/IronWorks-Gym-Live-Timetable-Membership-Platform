/**
 * IronWorks Gym — k6 Load Testing Script
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Simulates 200 concurrent users browsing, filtering, and booking on timetable
 * Command to run: k6 run tests/load/timetable-load.js
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp-up to 50 users
    { duration: '1m',  target: 200 }, // Peak load: 200 concurrent users
    { duration: '30s', target: 200 }, // Stay at 200 users
    { duration: '30s', target: 0 },   // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<350'], // 95% of requests must complete within 350ms
    http_req_failed: ['rate<0.01'],   // Error rate must be under 1%
  },
};

const BASE_API_URL = __ENV.API_URL || 'http://localhost:4000/v1';

export default function () {
  // 1. Health check probe
  const healthRes = http.get(`${BASE_API_URL}/health`);
  check(healthRes, {
    'health check status is 200': (r) => r.status === 200,
  });

  // 2. Fetch full timetable
  const classesRes = http.get(`${BASE_API_URL}/classes`);
  check(classesRes, {
    'classes status is 200': (r) => r.status === 200,
    'has classes data': (r) => JSON.parse(r.body).data.length > 0,
  });

  sleep(1);

  // 3. Filter timetable by Day and Category (simulates user clicks)
  const filteredRes = http.get(`${BASE_API_URL}/classes?day=MON&category=STRENGTH`);
  check(filteredRes, {
    'filtered classes status is 200': (r) => r.status === 200,
  });

  // 4. Fetch membership plans
  const plansRes = http.get(`${BASE_API_URL}/membership-plans`);
  check(plansRes, {
    'plans status is 200': (r) => r.status === 200,
  });

  // 5. Fetch coaches list
  const coachesRes = http.get(`${BASE_API_URL}/coaches`);
  check(coachesRes, {
    'coaches status is 200': (r) => r.status === 200,
  });

  sleep(2);
}

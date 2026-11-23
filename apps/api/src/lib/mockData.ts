/**
 * Fallback Mock Data for IronWorks Gym API
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Ensures /v1/classes, /v1/coaches, /v1/memberships/plans always return 200 OK
 * even when PostgreSQL or Docker is offline during local development.
 */

export const MOCK_COACHES = [
  {
    id: 'coach_dee_1',
    name: 'Sarah Jenkins (Coach Dee)',
    slug: 'coach-dee',
    role: 'Head Strength & Olympic Lifting',
    bio: 'NSCA-certified strength & conditioning specialist with 12 years of competitive weightlifting experience.',
    certifications: ['NSCA-CSCS', 'USAW Level 2', 'First Aid'],
    avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'coach_marco_2',
    name: 'Marcus Vance (Coach Marco)',
    slug: 'coach-marco',
    role: 'HIIT & Conditioning Specialist',
    bio: 'Former GB-level sprinter turned conditioning coach. Engine Room sessions built for mental grit and high VO2 max.',
    certifications: ['Level 3 Personal Trainer', 'First Aid', 'Sprint Mechanics (UK Athletics)'],
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'coach_ana_3',
    name: 'Elena Rostova (Coach Ana)',
    slug: 'coach-ana',
    role: 'Striking & Combat Head Coach',
    bio: 'Golden Gloves champion with European competition background. Combines real pugilistic footwork with anaerobic conditioning.',
    certifications: ['England Boxing Coach Level 2', 'Level 3 Personal Trainer', 'First Aid'],
    avatarUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'coach_jay_4',
    name: 'David Kim (Coach Jay)',
    slug: 'coach-jay',
    role: 'Mobility, Recovery & Longevity',
    bio: 'Licensed physiotherapist and mobility specialist dedicated to helping heavy lifters prevent injury and restore joint health.',
    certifications: ['200-hr RYT (Yoga Alliance)', 'FRC Mobility Specialist', 'First Aid'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    displayOrder: 4,
    isActive: true,
  },
];

export const MOCK_CLASSES = [
  // Monday
  { id: 'c1', name: 'Strength Foundations', slug: 'strength-foundations-mon', description: 'Deadlift, squat, press — coached form and progressive loading.', category: 'STRENGTH', dayOfWeek: 'MON', startTime: '06:30', durationMins: 60, capacity: 16, coachId: 'coach_dee_1', coach: MOCK_COACHES[0], isActive: true },
  { id: 'c2', name: 'Lunch Express HIIT', slug: 'lunch-express-hiit-mon', description: '30 minutes of maximum anaerobic output. No excuses.', category: 'HIIT', dayOfWeek: 'MON', startTime: '12:15', durationMins: 30, capacity: 20, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  { id: 'c3', name: 'Olympic Weightlifting', slug: 'olympic-lifting-mon', description: 'Snatch and clean & jerk barbell technique with video analysis.', category: 'STRENGTH', dayOfWeek: 'MON', startTime: '18:00', durationMins: 75, capacity: 12, coachId: 'coach_dee_1', coach: MOCK_COACHES[0], isActive: true },
  // Tuesday
  { id: 'c4', name: 'Engine Room Conditioning', slug: 'engine-room-conditioning-tue', description: 'Assault bikes, Concept2 rowers, and prowler sled intervals.', category: 'CONDITIONING', dayOfWeek: 'TUE', startTime: '07:00', durationMins: 60, capacity: 18, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  { id: 'c5', name: 'Yoga for Heavy Lifters', slug: 'yoga-for-lifters-tue', description: 'Hip openers, thoracic mobility, and shoulder restoration.', category: 'MOBILITY', dayOfWeek: 'TUE', startTime: '17:45', durationMins: 60, capacity: 20, coachId: 'coach_jay_4', coach: MOCK_COACHES[3], isActive: true },
  { id: 'c6', name: 'Boxing Fundamentals', slug: 'boxing-fundamentals-tue', description: 'Footwork, heavy bag combinations, and mittwork drills.', category: 'COMBAT', dayOfWeek: 'TUE', startTime: '19:00', durationMins: 60, capacity: 14, coachId: 'coach_ana_3', coach: MOCK_COACHES[2], isActive: true },
  // Wednesday
  { id: 'c7', name: 'Powerlifting Club: Squat & Bench', slug: 'powerlifting-squat-bench-wed', description: 'Heavy competition squat and bench press volume with spotters.', category: 'STRENGTH', dayOfWeek: 'WED', startTime: '06:30', durationMins: 75, capacity: 14, coachId: 'coach_dee_1', coach: MOCK_COACHES[0], isActive: true },
  { id: 'c8', name: 'Lunch Express HIIT', slug: 'lunch-express-hiit-wed', description: 'High-density metabolic circuit designed for lunch breaks.', category: 'HIIT', dayOfWeek: 'WED', startTime: '12:15', durationMins: 30, capacity: 20, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  { id: 'c9', name: 'Track Sprint Intervals', slug: 'sprint-intervals-wed', description: 'Curved treadmill sprints and explosive plyometric work.', category: 'CONDITIONING', dayOfWeek: 'WED', startTime: '18:30', durationMins: 45, capacity: 16, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  // Thursday
  { id: 'c10', name: 'Snatch & Clean Mastery', slug: 'snatch-clean-mastery-thu', description: 'Deep technical breakdown of the Olympic lifts.', category: 'STRENGTH', dayOfWeek: 'THU', startTime: '07:00', durationMins: 75, capacity: 12, coachId: 'coach_dee_1', coach: MOCK_COACHES[0], isActive: true },
  { id: 'c11', name: 'Active Mobility & Core Stability', slug: 'mobility-core-thu', description: 'Joint capsules, spine decompression, and loaded carries.', category: 'MOBILITY', dayOfWeek: 'THU', startTime: '17:45', durationMins: 60, capacity: 20, coachId: 'coach_jay_4', coach: MOCK_COACHES[3], isActive: true },
  { id: 'c12', name: 'Pugilist Technical Boxing', slug: 'boxing-fundamentals-thu', description: 'Defensive head movement, slip ropes, and pad rounds.', category: 'COMBAT', dayOfWeek: 'THU', startTime: '19:00', durationMins: 60, capacity: 14, coachId: 'coach_ana_3', coach: MOCK_COACHES[2], isActive: true },
  // Friday
  { id: 'c13', name: 'Engine Room Friday Assault', slug: 'engine-room-conditioning-fri', description: 'End-of-week high energy cardiovascular engine challenge.', category: 'CONDITIONING', dayOfWeek: 'FRI', startTime: '06:30', durationMins: 60, capacity: 18, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  { id: 'c14', name: 'Friday Fight Club (Advanced)', slug: 'friday-fight-club-fri', description: 'Controlled technical sparring under direct coach supervision.', category: 'COMBAT', dayOfWeek: 'FRI', startTime: '17:30', durationMins: 90, capacity: 10, coachId: 'coach_ana_3', coach: MOCK_COACHES[2], isActive: true },
  // Saturday
  { id: 'c15', name: 'Weekend Warrior Community WOD', slug: 'weekend-warrior-wod-sat', description: 'Big team circuit testing strength, grit, and aerobic capacity.', category: 'CONDITIONING', dayOfWeek: 'SAT', startTime: '09:00', durationMins: 75, capacity: 24, coachId: 'coach_marco_2', coach: MOCK_COACHES[1], isActive: true },
  { id: 'c16', name: 'Restorative Lifters Yoga', slug: 'yoga-for-lifters-sat', description: 'Deep stretch, myofascial release, and nervous system reset.', category: 'MOBILITY', dayOfWeek: 'SAT', startTime: '10:45', durationMins: 60, capacity: 20, coachId: 'coach_jay_4', coach: MOCK_COACHES[3], isActive: true },
  // Sunday
  { id: 'c17', name: 'Sunday Heavy Barbell Session', slug: 'heavy-barbell-sun', description: 'Open barbell floor with dedicated coaching on heavy singles.', category: 'STRENGTH', dayOfWeek: 'SUN', startTime: '10:00', durationMins: 90, capacity: 16, coachId: 'coach_dee_1', coach: MOCK_COACHES[0], isActive: true },
  { id: 'c18', name: 'Open Mat Mobility & Stretch', slug: 'open-mat-mobility-sun', description: 'Guided breathing and restorative mobility flow.', category: 'MOBILITY', dayOfWeek: 'SUN', startTime: '11:45', durationMins: 60, capacity: 20, coachId: 'coach_jay_4', coach: MOCK_COACHES[3], isActive: true },
];

export const MOCK_MEMBERSHIP_PLANS = [
  {
    id: 'plan_standard',
    name: 'Standard Tier',
    slug: 'standard-tier',
    tier: 'STANDARD',
    priceGbpPence: 4900,
    priceMonthly: 49,
    tagline: 'Train on your schedule with full open floor access.',
    description: 'Full open gym floor access plus 4 coach-led classes per month.',
    features: [
      { text: 'Full gym floor access (05:30–23:00)', included: true },
      { text: '4 coach-led classes per month', included: true },
      { text: 'Locker & luxury shower facilities', included: true },
      { text: 'Free IronWorks mobile companion app', included: true },
      { text: 'Guest passes', included: false },
    ],
    isPopular: false,
    isFeatured: false,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'plan_unlimited',
    name: 'Unlimited Tier',
    slug: 'unlimited-tier',
    tier: 'UNLIMITED',
    priceGbpPence: 7500,
    priceMonthly: 75,
    tagline: 'Our flagship membership. All 18 weekly classes unmetered.',
    description: 'Unlimited open gym access and unlimited coach-led class reservations.',
    features: [
      { text: 'Unlimited gym floor access (05:30–23:00)', included: true },
      { text: 'All 18 weekly classes unmetered', included: true },
      { text: '7-day advance class booking window', included: true },
      { text: '1 free guest pass every month', included: true },
      { text: '15% discount on 1-on-1 personal training', included: true },
    ],
    isPopular: true,
    isFeatured: true,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'plan_founding',
    name: 'Founding Member',
    slug: 'founding-member',
    tier: 'FOUNDING_MEMBER',
    priceGbpPence: 9900,
    priceMonthly: 99,
    tagline: 'VIP athletic tier with monthly 1-on-1 coaching & programming.',
    description: 'All-inclusive VIP membership with monthly 1-on-1 coach check-ins.',
    features: [
      { text: 'Everything in Unlimited Tier', included: true },
      { text: 'Monthly 60-min 1-on-1 coaching session', included: true },
      { text: 'Custom 12-week lifting & nutrition programme', included: true },
      { text: 'Guaranteed spot in peak classes', included: true },
      { text: 'Exclusive IronWorks competition apparel pack', included: true },
    ],
    isPopular: false,
    isFeatured: false,
    displayOrder: 3,
    isActive: true,
  },
];

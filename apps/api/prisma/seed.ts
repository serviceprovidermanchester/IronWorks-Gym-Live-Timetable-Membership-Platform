/**
 * IronWorks Gym — Database Seed
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Run: pnpm --filter @ironworks/api db:seed
 */
import { PrismaClient, ClassCategory, DayOfWeek, MembershipTier, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding IronWorks Gym database...\n');

  // ── 1. Coaches ──────────────────────────────────────────────
  console.log('Creating coaches...');
  const coaches = await Promise.all([
    prisma.coach.upsert({
      where: { slug: 'coach-dee' },
      update: {},
      create: {
        name: 'Coach Dee',
        slug: 'coach-dee',
        role: 'Strength & Olympic Lifting',
        bio: 'NSCA-certified strength & conditioning specialist with 12 years of competitive weightlifting experience. Coach Dee\'s programming combines Eastern European lifting science with practical gym-floor coaching.',
        certifications: ['NSCA-CSCS', 'USAW Level 2', 'First Aid'],
        displayOrder: 1,
      },
    }),
    prisma.coach.upsert({
      where: { slug: 'coach-marco' },
      update: {},
      create: {
        name: 'Coach Marco',
        slug: 'coach-marco',
        role: 'HIIT & Conditioning',
        bio: 'Former GB-level sprinter turned conditioning coach. Marco\'s Engine Room sessions are legendary in Manchester — expect maximum effort, maximum results, and no excuses.',
        certifications: ['Level 3 Personal Trainer', 'First Aid', 'Sprint Mechanics (UK Athletics)'],
        displayOrder: 2,
      },
    }),
    prisma.coach.upsert({
      where: { slug: 'coach-ana' },
      update: {},
      create: {
        name: 'Coach Ana',
        slug: 'coach-ana',
        role: 'Yoga & Mobility',
        bio: '200-hr RYT with a specialism in yoga for strength athletes and injury recovery. Ana\'s sessions bridge the gap between heavy lifting and long-term joint health.',
        certifications: ['200-hr RYT (Yoga Alliance)', 'FRC Mobility Specialist', 'First Aid'],
        instagramUrl: 'https://instagram.com/coachana.yoga',
        displayOrder: 3,
      },
    }),
    prisma.coach.upsert({
      where: { slug: 'coach-jay' },
      update: {},
      create: {
        name: 'Coach Jay',
        slug: 'coach-jay',
        role: 'Boxing & Combat',
        bio: 'Ex-amateur boxing champion, 3x Manchester title holder. Jay coaches fundamentals for fitness and confidence — not fighting. Friday Fight Club is for experienced members only.',
        certifications: ['England Boxing Coach Level 2', 'Level 3 Personal Trainer', 'First Aid'],
        displayOrder: 4,
      },
    }),
  ]);

  const [dee, marco, ana, jay] = coaches;
  console.log(`  ✓ ${coaches.length} coaches created`);

  // ── 2. Class Sessions ───────────────────────────────────────
  console.log('Creating class sessions...');
  const classData = [
    // Monday
    { name: 'Strength Foundations', slug: 'strength-foundations-mon', description: 'The base of everything. Deadlift, squat, press — coached form, progressive loading.', category: ClassCategory.STRENGTH, dayOfWeek: DayOfWeek.MON, startTime: '06:30', durationMins: 60, capacity: 16, coachId: dee.id, tags: ['beginner-friendly', 'barbell'] },
    { name: 'Lunch Express HIIT', slug: 'lunch-express-hiit-mon', description: '30 minutes of maximum intensity. No equipment excuses, no easy options.', category: ClassCategory.HIIT, dayOfWeek: DayOfWeek.MON, startTime: '12:15', durationMins: 30, capacity: 20, coachId: marco.id, tags: ['30-min', 'high-intensity'] },
    { name: 'Olympic Lifting', slug: 'olympic-lifting-mon', description: 'Snatch and clean & jerk technique. All levels welcome — beginner bars available.', category: ClassCategory.STRENGTH, dayOfWeek: DayOfWeek.MON, startTime: '18:00', durationMins: 75, capacity: 12, coachId: dee.id, tags: ['technical', 'barbell'] },
    // Tuesday
    { name: 'Engine Room Conditioning', slug: 'engine-room-conditioning-tue', description: 'Marco\'s signature class. Assault bike, rower, sled — expect lungs to burn.', category: ClassCategory.CONDITIONING, dayOfWeek: DayOfWeek.TUE, startTime: '07:00', durationMins: 60, capacity: 18, coachId: marco.id, tags: ['equipment-required', 'cardio'] },
    { name: 'Yoga for Lifters', slug: 'yoga-for-lifters-tue', description: 'Hip openers, thoracic mobility, shoulder prep. The session your body has been asking for.', category: ClassCategory.MOBILITY, dayOfWeek: DayOfWeek.TUE, startTime: '17:45', durationMins: 60, capacity: 20, coachId: ana.id, tags: ['beginner-friendly', 'mat'] },
    { name: 'Boxing Fundamentals', slug: 'boxing-fundamentals-tue', description: 'Jab, cross, hook, uppercut. Pad work, combinations, fitness. No experience needed.', category: ClassCategory.COMBAT, dayOfWeek: DayOfWeek.TUE, startTime: '19:00', durationMins: 60, capacity: 14, coachId: jay.id, tags: ['beginner-friendly', 'gloves-required'] },
    // Wednesday
    { name: 'Strength Foundations', slug: 'strength-foundations-wed', description: 'The base of everything. Deadlift, squat, press — coached form, progressive loading.', category: ClassCategory.STRENGTH, dayOfWeek: DayOfWeek.WED, startTime: '06:30', durationMins: 60, capacity: 16, coachId: dee.id, tags: ['beginner-friendly', 'barbell'] },
    { name: 'Lunch Express HIIT', slug: 'lunch-express-hiit-wed', description: '30 minutes of maximum intensity. No equipment excuses, no easy options.', category: ClassCategory.HIIT, dayOfWeek: DayOfWeek.WED, startTime: '12:15', durationMins: 30, capacity: 20, coachId: marco.id, tags: ['30-min', 'high-intensity'] },
    { name: 'Sprint Intervals', slug: 'sprint-intervals-wed', description: 'Track-style sprint sets adapted for the gym floor. Speed, power, recovery.', category: ClassCategory.CONDITIONING, dayOfWeek: DayOfWeek.WED, startTime: '18:30', durationMins: 45, capacity: 16, coachId: ana.id, tags: ['high-intensity', 'cardio'] },
    // Thursday
    { name: 'Olympic Lifting', slug: 'olympic-lifting-thu', description: 'Snatch and clean & jerk technique. All levels welcome — beginner bars available.', category: ClassCategory.STRENGTH, dayOfWeek: DayOfWeek.THU, startTime: '07:00', durationMins: 75, capacity: 12, coachId: dee.id, tags: ['technical', 'barbell'] },
    { name: 'Mobility & Core', slug: 'mobility-core-thu', description: 'Targeted mobility circuits and loaded carries for core stability. Athletes only think they don\'t need this.', category: ClassCategory.MOBILITY, dayOfWeek: DayOfWeek.THU, startTime: '17:45', durationMins: 60, capacity: 20, coachId: ana.id, tags: ['mat', 'core'] },
    { name: 'Boxing Fundamentals', slug: 'boxing-fundamentals-thu', description: 'Jab, cross, hook, uppercut. Pad work, combinations, fitness. No experience needed.', category: ClassCategory.COMBAT, dayOfWeek: DayOfWeek.THU, startTime: '19:00', durationMins: 60, capacity: 14, coachId: jay.id, tags: ['beginner-friendly', 'gloves-required'] },
    // Friday
    { name: 'Engine Room Conditioning', slug: 'engine-room-conditioning-fri', description: 'Marco\'s signature class. Assault bike, rower, sled — expect lungs to burn.', category: ClassCategory.CONDITIONING, dayOfWeek: DayOfWeek.FRI, startTime: '06:30', durationMins: 60, capacity: 18, coachId: marco.id, tags: ['equipment-required', 'cardio'] },
    { name: 'Friday Fight Club', slug: 'friday-fight-club-fri', description: 'Controlled sparring for experienced members (12+ months boxing training). Invitation from Coach Jay required.', category: ClassCategory.COMBAT, dayOfWeek: DayOfWeek.FRI, startTime: '17:30', durationMins: 90, capacity: 10, coachId: jay.id, tags: ['advanced', 'experienced-only', 'gloves-required'] },
    // Saturday
    { name: 'Weekend Warrior WOD', slug: 'weekend-warrior-wod-sat', description: 'All coaches, all out. The Saturday WOD rotates weekly — strength, conditioning, mixed. Community favourite.', category: ClassCategory.CONDITIONING, dayOfWeek: DayOfWeek.SAT, startTime: '09:00', durationMins: 60, capacity: 24, coachId: marco.id, tags: ['community', 'mixed'] },
    { name: 'Yoga for Lifters', slug: 'yoga-for-lifters-sat', description: 'Hip openers, thoracic mobility, shoulder prep. The session your body has been asking for.', category: ClassCategory.MOBILITY, dayOfWeek: DayOfWeek.SAT, startTime: '10:30', durationMins: 60, capacity: 20, coachId: ana.id, tags: ['beginner-friendly', 'mat'] },
    // Sunday
    { name: 'Long Slow Strength', slug: 'long-slow-strength-sun', description: 'No clock, no rush. Heavy singles, doubles and triples with long rest periods. For those who enjoy the process.', category: ClassCategory.STRENGTH, dayOfWeek: DayOfWeek.SUN, startTime: '10:00', durationMins: 90, capacity: 14, coachId: dee.id, tags: ['advanced', 'barbell', 'powerlifting'] },
    { name: 'Open Mat Mobility', slug: 'open-mat-mobility-sun', description: 'Guided free-flow mobility session. Ana leads, you explore your own needs. Stretching music included.', category: ClassCategory.MOBILITY, dayOfWeek: DayOfWeek.SUN, startTime: '11:30', durationMins: 60, capacity: 20, coachId: ana.id, tags: ['beginner-friendly', 'mat', 'relaxed'] },
  ];

  for (const cls of classData) {
    await prisma.classSession.upsert({
      where: { slug: cls.slug },
      update: {},
      create: cls,
    });
  }
  console.log(`  ✓ ${classData.length} class sessions created`);

  // ── 3. Membership Plans ─────────────────────────────────────
  console.log('Creating membership plans...');
  const plans = [
    {
      tier: MembershipTier.OFF_PEAK,
      name: 'Off-Peak',
      slug: 'off-peak',
      tagline: 'Train on your terms. 09:00–16:00 + all weekend.',
      priceGbpPence: 2900,
      features: [
        { text: 'Full gym access (09:00–16:00 weekdays)', included: true },
        { text: 'Full access weekends (all hours)', included: true },
        { text: 'All off-peak classes included', included: true },
        { text: 'Locker & changing facilities', included: true },
        { text: 'Peak-hour access (before 09:00 / after 16:00 weekdays)', included: false },
        { text: 'PT or coaching sessions', included: false },
      ],
      isPopular: false,
      displayOrder: 1,
    },
    {
      tier: MembershipTier.ALL_ACCESS,
      name: 'All Access',
      slug: 'all-access',
      tagline: 'No restrictions. Unlimited classes, any time.',
      priceGbpPence: 4200,
      features: [
        { text: 'Unlimited gym access (any time, 05:30–23:00)', included: true },
        { text: 'Unlimited classes (all categories)', included: true },
        { text: 'Locker & changing facilities', included: true },
        { text: 'Class booking (live build)', included: true },
        { text: 'Guest pass (1/month)', included: true },
        { text: 'PT or coaching sessions', included: false },
      ],
      isPopular: true,
      displayOrder: 2,
    },
    {
      tier: MembershipTier.ALL_ACCESS_PLUS,
      name: 'All Access + Coaching',
      slug: 'all-access-plus',
      tagline: 'Everything in All Access, plus personal coaching.',
      priceGbpPence: 7900,
      features: [
        { text: 'Everything in All Access', included: true },
        { text: 'Monthly 1-to-1 coaching session (60 min)', included: true },
        { text: 'Personal training programme (12-week rolling)', included: true },
        { text: 'Progress tracking & check-ins', included: true },
        { text: 'Direct coach messaging (WhatsApp)', included: true },
        { text: 'Guest pass (2/month)', included: true },
      ],
      isPopular: false,
      displayOrder: 3,
    },
  ];

  for (const plan of plans) {
    await prisma.membershipPlan.upsert({
      where: { tier: plan.tier },
      update: {},
      create: plan,
    });
  }
  console.log(`  ✓ ${plans.length} membership plans created`);

  // ── 4. Admin User ───────────────────────────────────────────
  console.log('Creating admin user...');
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ironworksgym.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'AdminPassword123!';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.member.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      firstName: 'IronWorks',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      emailVerifiedAt: new Date(),
    },
  });
  console.log(`  ✓ Admin user: ${adminEmail}`);

  // ── 5. Sample Announcement ──────────────────────────────────
  console.log('Creating sample announcement...');
  await prisma.announcement.upsert({
    where: { id: 'seed-announcement-1' },
    update: {},
    create: {
      id: 'seed-announcement-1',
      title: '🏋️ IronWorks is now open — Join online tonight',
      body: 'No joining fee in November. First month free on All Access when you sign up before 30 November.',
      type: 'promotion',
      isActive: true,
    },
  });
  console.log('  ✓ Sample announcement created');

  console.log('\n✅ Seed complete! IronWorks Gym database is ready.\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/**
 * Payload CMS Bootstrap & Seeding Script
 * IronWorks Gym · SPManchester Private Limited
 */
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

export async function seedCMS() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'dev-secret-payload-key',
    local: true,
  });

  payload.logger.info('Checking Payload CMS collections for seeding...');

  // 1. Seed Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@ironworksgym.co.uk' } },
  });

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ironworksgym.co.uk',
        password: 'AdminPassword2026!',
        name: 'IronWorks Head Admin',
        role: 'admin',
      },
    });
    payload.logger.info('✓ Created admin user: admin@ironworksgym.co.uk (password: AdminPassword2026!)');
  }

  // 2. Seed Coaches
  const existingCoaches = await payload.find({ collection: 'coaches', limit: 1 });
  let coachSarahId: string | number = '';

  if (existingCoaches.totalDocs === 0) {
    const coach1 = await payload.create({
      collection: 'coaches',
      data: {
        name: 'Sarah Jenkins',
        slug: 'sarah-jenkins',
        title: 'Head Strength & Conditioning Coach',
        bio: '10+ years specializing in barbell mechanics, periodization, and competitive powerlifting.',
        instagram: '@sarahj_ironworks',
        specialties: [{ specialty: 'Powerlifting' }, { specialty: 'Barbell Mechanics' }],
        isActive: true,
      },
    });
    coachSarahId = coach1.id;

    await payload.create({
      collection: 'coaches',
      data: {
        name: 'Marcus Vance',
        slug: 'marcus-vance',
        title: 'Conditioning & High-Performance Coach',
        bio: 'Ex-military physical training instructor specializing in metabolic intervals and mental resilience.',
        instagram: '@marcus_ironworks',
        specialties: [{ specialty: 'HIIT' }, { specialty: 'Metabolic Conditioning' }],
        isActive: true,
      },
    });

    await payload.create({
      collection: 'coaches',
      data: {
        name: 'Elena Rostova',
        slug: 'elena-rostova',
        title: 'Striking & Boxing Coach',
        bio: 'Golden Gloves champion combining technical pugilism with high-demand anaerobic conditioning.',
        instagram: '@elena_boxing_mcr',
        specialties: [{ specialty: 'Boxing' }, { specialty: 'Footwork' }],
        isActive: true,
      },
    });

    await payload.create({
      collection: 'coaches',
      data: {
        name: 'David Kim',
        slug: 'david-kim',
        title: 'Mobility, Recovery & Athletic Longevity',
        bio: 'Licensed physiotherapist helping lifters prevent injury and restore athletic joint range.',
        instagram: '@davidkim_physio',
        specialties: [{ specialty: 'Mobility' }, { specialty: 'Injury Rehab' }],
        isActive: true,
      },
    });

    payload.logger.info('✓ Seeded 4 Head Coaches');
  } else {
    coachSarahId = existingCoaches.docs[0].id;
  }

  // 3. Seed Sample Announcement
  const existingAnnouncements = await payload.find({ collection: 'announcements', limit: 1 });
  if (existingAnnouncements.totalDocs === 0) {
    await payload.create({
      collection: 'announcements',
      data: {
        title: 'New Eleiko Competition Barbells Installed',
        content: '6 new 20kg Eleiko IPF competition bars and calibrated discs have arrived on the main lifting platform.',
        priority: 'NORMAL',
        publishedAt: new Date().toISOString(),
      },
    });
    payload.logger.info('✓ Seeded gym announcement');
  }

  payload.logger.info('Payload CMS seeding complete!');
  process.exit(0);
}

seedCMS().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

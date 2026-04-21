import { PrismaClient, TradeAccountStatus, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('ChangeMe123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@jagrent.com.au' },
    update: {
      firstName: 'JAG',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      passwordHash: hashed,
    },
    create: {
      email: 'admin@jagrent.com.au',
      firstName: 'JAG',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      passwordHash: hashed,
    },
  });

  const tradeUser = await prisma.user.upsert({
    where: { email: 'foreman@summitcivil.com.au' },
    update: {
      firstName: 'Alex',
      lastName: 'Foreman',
      role: UserRole.TRADE_CUSTOMER,
      passwordHash: hashed,
    },
    create: {
      email: 'foreman@summitcivil.com.au',
      firstName: 'Alex',
      lastName: 'Foreman',
      role: UserRole.TRADE_CUSTOMER,
      passwordHash: hashed,
    },
  });

  const earthmoving = await prisma.equipmentCategory.upsert({
    where: { slug: 'earthmoving' },
    update: { name: 'Earthmoving', description: 'Excavators, loaders, and trenching gear.' },
    create: { slug: 'earthmoving', name: 'Earthmoving', description: 'Excavators, loaders, and trenching gear.' },
  });

  const access = await prisma.equipmentCategory.upsert({
    where: { slug: 'access-equipment' },
    update: { name: 'Access Equipment', description: 'Scissor lifts, booms, and access platforms.' },
    create: { slug: 'access-equipment', name: 'Access Equipment', description: 'Scissor lifts, booms, and access platforms.' },
  });

  const compaction = await prisma.equipmentCategory.upsert({
    where: { slug: 'compaction' },
    update: { name: 'Compaction', description: 'Plate compactors and rollers.' },
    create: { slug: 'compaction', name: 'Compaction', description: 'Plate compactors and rollers.' },
  });

  const excavator = await prisma.equipment.upsert({
    where: { sku: 'JAG-EX-1700' },
    update: {
      name: '1.7T Excavator',
      slug: '1-7t-excavator',
      categoryId: earthmoving.id,
      description: 'Compact excavator suited for trenching and tight access jobs.',
      baseDailyRateCents: 28500,
      bondCents: 150000,
      stockQty: 3,
    },
    create: {
      sku: 'JAG-EX-1700',
      name: '1.7T Excavator',
      slug: '1-7t-excavator',
      categoryId: earthmoving.id,
      description: 'Compact excavator suited for trenching and tight access jobs.',
      baseDailyRateCents: 28500,
      bondCents: 150000,
      stockQty: 3,
      specsJson: { operatingWeightKg: 1700, powerKw: 14.8 },
    },
  });

  const scissorLift = await prisma.equipment.upsert({
    where: { sku: 'JAG-SL-19' },
    update: {
      name: 'Scissor Lift 19ft',
      slug: 'scissor-lift-19ft',
      categoryId: access.id,
      baseDailyRateCents: 19000,
      bondCents: 120000,
      stockQty: 5,
      requiresLicence: true,
    },
    create: {
      sku: 'JAG-SL-19',
      name: 'Scissor Lift 19ft',
      slug: 'scissor-lift-19ft',
      categoryId: access.id,
      description: 'Electric scissor lift for internal and slab-site access.',
      baseDailyRateCents: 19000,
      bondCents: 120000,
      stockQty: 5,
      requiresLicence: true,
      specsJson: { platformHeightFt: 19, safeWorkingLoadKg: 230 },
    },
  });

  await prisma.equipment.upsert({
    where: { sku: 'JAG-PC-80' },
    update: {
      name: 'Plate Compactor 80kg',
      slug: 'plate-compactor-80kg',
      categoryId: compaction.id,
      baseDailyRateCents: 6500,
      bondCents: 35000,
      stockQty: 10,
    },
    create: {
      sku: 'JAG-PC-80',
      name: 'Plate Compactor 80kg',
      slug: 'plate-compactor-80kg',
      categoryId: compaction.id,
      description: 'Reliable compactor for paving prep and trench reinstatement.',
      baseDailyRateCents: 6500,
      bondCents: 35000,
      stockQty: 10,
      specsJson: { operatingMassKg: 80 },
    },
  });

  await prisma.pricingRule.deleteMany({
    where: { equipmentId: { in: [excavator.id, scissorLift.id] } },
  });

  await prisma.pricingRule.createMany({
    data: [
      { equipmentId: excavator.id, tradeTier: 'STANDARD', minimumHireDays: 1, rateCents: 28500 },
      { equipmentId: excavator.id, tradeTier: 'GOLD', minimumHireDays: 1, rateCents: 25500 },
      { equipmentId: scissorLift.id, tradeTier: 'STANDARD', minimumHireDays: 1, rateCents: 19000 },
      { equipmentId: scissorLift.id, tradeTier: 'GOLD', minimumHireDays: 1, rateCents: 17500 },
    ],
  });

  await prisma.tradeAccount.upsert({
    where: { userId: tradeUser.id },
    update: {
      companyName: 'Summit Civil Pty Ltd',
      abn: '83918273645',
      tier: 'GOLD',
      status: TradeAccountStatus.APPROVED,
      approvedByUserId: admin.id,
      approvedAt: new Date(),
    },
    create: {
      userId: tradeUser.id,
      companyName: 'Summit Civil Pty Ltd',
      abn: '83918273645',
      tier: 'GOLD',
      status: TradeAccountStatus.APPROVED,
      approvedByUserId: admin.id,
      approvedAt: new Date(),
    },
  });

  console.log('Seed complete: categories, equipment, pricing rules, and demo trade account created.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding ADYK Inspire database...");

  const testRegistration = await prisma.registration.upsert({
    where: { id: "test-seed-uuid-0001" },
    update: {},
    create: {
      id: "test-seed-uuid-0001",
      fullName: "Rejiesh Ashwanth",
      email: "adykcompany.in@gmail.com",
      whatsapp: "+91 8870605699",
      location: "Chennai, India",
      ageGroup: "22–25",
      role: "Founder",
      interests: ["Startups", "AI / ML", "Software Development", "Product Building"],
      hasIdea: "YES",
      ideaDescription: "Building multi-venture technology platforms and ecosystem solutions under ADYK.",
      explorationDescription: null,
      lookingFor: ["Find Collaborators", "Build a Project", "Networking"],
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      website: "https://adyk.in",
      contactPreference: "WhatsApp",
      consent: true,
      status: "NEW",
    },
  });

  console.log("✅ Seeded test registration:", testRegistration.email);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

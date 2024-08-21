import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users: any[] = [];

  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        createdAt: faker.date.past(),

        createdCourses: {
          create: {
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            image: faker.image.avatar(),
            createdAt: faker.date.past(),
            lessons: {
              createMany: {
                data: [
                  {
                    name: faker.lorem.sentence(),
                    rank: faker.number.int({ min: 1, max: 5 }).toString(),
                    content: faker.lorem.paragraph(),
                  },
                  {
                    name: faker.lorem.sentence(3),
                    rank: faker.number.int({ min: 1, max: 5 }).toString(),
                    content: faker.lorem.paragraph(),
                  },
                ],
              },
            },
          },
        },
      },
    });
    users.push(user);
  }

  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const randomUser = faker.helpers.arrayElements(users, 3);

    for (const user of randomUser) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
          createdAt: faker.date.past(),
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

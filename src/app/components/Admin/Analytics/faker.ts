// ESM
import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    user_role: "user",
    verified: 1,
    avatar_public_id: faker.image.avatar(),
    avatar_url: faker.image.avatar(),
    timestamp: faker.date.between({
      from: "2023-01-01T00:00:00.000Z",
      to: "2025-01-01T00:00:00.000Z",
    }),
    date: faker.date.between({
      from: "2023-01-01T00:00:00.000Z",
      to: "2025-01-01T00:00:00.000Z",
    }),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 20,
});

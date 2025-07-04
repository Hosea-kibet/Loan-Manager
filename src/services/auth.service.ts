import prisma from '../config/prisma';
import { createUserWithRoles, initializeKeycloakAdmin } from '../utils/keycloak-admin';

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  roles?: string[];
  token: string;
}


export const registerUser = async ({ fullName, email, password, roles = [],token }: RegisterInput) => {
  const kc = await initializeKeycloakAdmin(token);

  const keycloakUser = await createUserWithRoles({
    kc,
    username: email,
    email,
    password,
    roles,
  });

  const appUser = await prisma.user.create({
    data: {
      name: fullName,
      email,
      userId: keycloakUser.id!,
    },
  });

  return {
    id: appUser.id,
    email: appUser.email,
    fullName: appUser.name,
    roles,
  };
};

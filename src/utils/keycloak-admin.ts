import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { createError } from './app-error';

const kcAdminClient = new KeycloakAdminClient({
  baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080',
  realmName: process.env.KEYCLOAK_REALM || 'admin',
});


export async function initializeKeycloakAdmin() {
  const baseUrl = process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080';
  const realmName = process.env.KEYCLOAK_REALM || 'master';

  const kcAdminClient = new KeycloakAdminClient({ baseUrl, realmName });


  console.log('[Keycloak] Authenticating via client credentials...');
  try {
    await kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
    });
  } catch (err: any) {
    const message =
      err?.responseData?.error_description || err?.responseData?.error || 'Keycloak auth failed';
    const status = err?.response?.status || 500;
    throw createError(message, status);
  }



  console.log('[Keycloak] Authenticated successfully.');

  return kcAdminClient;
}


export async function createUserWithRoles({
  kc,
  username,
  email,
  password,
  roles = [],
}: {
  kc: KeycloakAdminClient;
  username: string;
  email: string;
  password: string;
  roles?: string[];
}) {
  let user;

  try {
    user = await kc.users.create({
      realm: kc.realmName!,
      username,
      email,
      enabled: true,
      emailVerified: true,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    });
  } catch (err: any) {
    const kcErrorMessage = err?.responseData?.errorMessage || 'Keycloak error';
    const kcStatusCode = err?.response?.status || 500;

    throw createError(kcErrorMessage, kcStatusCode);
  }

  if (roles.length > 0) {
    const availableRoles = await kc.roles.find({ realm: kc.realmName! });
    const rolesToAssign = availableRoles
      .filter((r) => roles.includes(r.name!) && r.id)
      .map((r) => ({
        id: r.id!,
        name: r.name!,
      }));

    await kc.users.addRealmRoleMappings({
      id: user.id!,
      roles: rolesToAssign,
      realm: kc.realmName!,
    });
  }

  return user;
}



export async function updateUser(
  kc: KeycloakAdminClient,
  userId: string,
  updates: Partial<{ email: string; username: string }>
) {

  await kc.users.update(
    { id: userId, realm: kcAdminClient.realmName! },
    updates
  );
}


export async function deleteUser(kc: KeycloakAdminClient, userId: string) {

  await kc.users.del({
    id: userId,
    realm: kcAdminClient.realmName!,
  });
}


export async function fetchKeycloakRoles(kc: KeycloakAdminClient): Promise<string[]> {

  const roles = await kc.roles.find({
    realm: kcAdminClient.realmName!,
  });

  return roles.map((role) => role.name!);
}

export default kcAdminClient;

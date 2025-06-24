import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

const kcAdminClient = new KeycloakAdminClient({
  baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080',
  realmName: process.env.KEYCLOAK_REALM || 'myrealm',
});


export async function initializeKeycloakAdmin(token: string) {
  kcAdminClient.setAccessToken(token);
  return kcAdminClient;
}

/**
 * Create a new Keycloak user and assign optional roles
 */
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
  const user = await kc.users.create({
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


/**
 * Update a Keycloak user
 */
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

/**
 * Delete a Keycloak user
 */
export async function deleteUser(kc: KeycloakAdminClient, userId: string) {

  await kc.users.del({
    id: userId,
    realm: kcAdminClient.realmName!,
  });
}

/**
 * Fetch all realm roles (to sync to DB or cache)
 */
export async function fetchKeycloakRoles(kc: KeycloakAdminClient): Promise<string[]> {

  const roles = await kc.roles.find({
    realm: kcAdminClient.realmName!,
  });

  return roles.map((role) => role.name!);
}

export default kcAdminClient;

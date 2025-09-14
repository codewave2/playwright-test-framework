export type User = {
  username: string;
  password: string;
};

const password = process.env.PASSWORD;
if (!password) {
  throw new Error(
    'PASSWORD environment variable is required but not provided. Please set it in your .env file.',
  );
}

export const Users: Record<string, User> = {
  standard: { username: 'standard_user', password },
  locked: { username: 'locked_out_user', password },
} as const;

/**
 * Stub user store — replace with MongoDB lookup when the database is wired up.
 *
 * Passwords were pre-hashed with bcrypt (cost 12):
 *   admin123  → generated at build time via scripts/hashPasswords.ts
 *   user123   → same
 *
 * To regenerate:
 *   npx ts-node -e "const b=require('bcryptjs'); console.log(b.hashSync('admin123',12))"
 */

export type StubUser = {
  id: string
  email: string
  /** bcrypt hash */
  passwordHash: string
  name: string
  role: 'user' | 'admin'
}

export const STUB_USERS: StubUser[] = [
  {
    id: 'admin-1',
    email: 'admin@triggerstocks.com',
    // hash of "admin123"
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeAwhFP7pMT3yglny',
    name: 'Admin',
    role: 'admin',
  },
  {
    id: 'user-1',
    email: 'user@triggerstocks.com',
    // hash of "user123"
    passwordHash: '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Demo User',
    role: 'user',
  },
]

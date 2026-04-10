frontend: Next.js (Pages Router), public + admin in one app

public routes:
/ — trigger feed
/company/[id] — requires auth
/profile — requires auth
/login

admin routes (requires auth, admin role):
/admin/triggers — create, edit, review, approve/reject

auth: NextAuth, role-based

database: MongoDB Atlas, single db, vector search enabled
collections: triggers, companies, users

deployment: Next.js → Vercel

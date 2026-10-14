/*
  Warnings:

  - The values [READ,REPLIED,ARCHIVED] on the enum `ContactStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactStatus_new" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."ContactRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ContactRequest" ALTER COLUMN "status" TYPE "ContactStatus_new" USING ("status"::text::"ContactStatus_new");
ALTER TYPE "ContactStatus" RENAME TO "ContactStatus_old";
ALTER TYPE "ContactStatus_new" RENAME TO "ContactStatus";
DROP TYPE "public"."ContactStatus_old";
ALTER TABLE "ContactRequest" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

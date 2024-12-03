/*
  Warnings:

  - The `timestamp` column on the `equipment_report` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "equipment_report" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM now()) * 1000)::bigint;

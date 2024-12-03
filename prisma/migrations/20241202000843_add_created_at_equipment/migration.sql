-- AlterTable
ALTER TABLE "equipment" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "equipment_report" ALTER COLUMN "timestamp" SET DEFAULT (EXTRACT(EPOCH FROM now()) * 1000)::bigint;

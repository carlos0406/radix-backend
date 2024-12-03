-- CreateTable
CREATE TABLE "equipment" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_report" (
    "id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipment_report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipment_report" ADD CONSTRAINT "equipment_report_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

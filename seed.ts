import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()
  await prisma.equipment.createMany({
    data: [{
      id:"a168e80e-2bf4-4362-a49c-7ff875e1c8eb",
      description: 'Equipment 1 sensor 2',
    },
    {
      id:"975c7c96-6624-45ce-831e-9c7cf0a50cfb",
      description: 'Equipment 1 sensor 1',
    },
    {
      id:"8b062bc5-34ec-4c27-9194-40da50555f36",
      description:"eq21234"
    }
    
  ],
  skipDuplicates: true,
  })
}

main()
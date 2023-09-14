import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
 log: [{ emit: 'event', level: 'query' }],
})

prisma.$on('query', (e) => {
  console.log()
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

async function main() {
  const dept_emp = await prisma.dept_emp.findMany({     
    where: {
        dept_no: 'D002'
    }, 
    include: {
        departments: true,
        employees: true
    },
    orderBy: {
      from_date: 'desc'
    },
    take: 10
  })
  dept_emp.map(rec => console.log(rec))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/*
    Case-insensitive filtering
    Case-insensitive filtering is available as a feature for the PostgreSQL and MongoDB providers. MySQL, MariaDB and Microsoft SQL Server are case-insensitive by default, and do not require a Prisma Client feature to make case-insensitive filtering possible.

    To use case-insensitive filtering, add the mode property to a particular filter and specify insensitive:

    https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering
*/
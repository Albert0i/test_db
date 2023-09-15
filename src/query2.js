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
  const subordinates = await prisma.employees.findMany({
    where: {
        first_name: 'Arie', 
        last_name: 'Staelin'
    },
    select: {
        dept_manager: {
            select: {
                dept_no: true, 
                departments: {
                    select: {
                        dept_name: true,
                        dept_emp: {
                            select: {
                                        employees: true
                                    },
                                },
                            }
                        }
                    }
                },
            }
  })
  subordinates.map(subordinate => { 
    console.log('subordinate=', subordinate) 
    subordinate.dept_manager.map(department => {
        console.log('subordinate.dept_manager=', department)
    })    
  })
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
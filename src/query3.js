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
  const managers = await prisma.employees.findMany({
    where: {
        first_name: 'Bojan', 
        last_name: 'Montemayor'
    },
    select: {
        dept_emp: {
            select: {
                dept_no: true, 
                departments: {
                    select: {
                        dept_name: true,
                        dept_manager: {
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
  managers.map(manager => { 
    console.log('manager=', manager) 
    manager.dept_emp.map(department => {
        console.log('manager.dept_emp=', department)
        department.departments.dept_manager.map(d => console.log('dept_manager=', d))
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
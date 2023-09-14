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
  /*
    select dept_no, count(emp_no) from dept_manager 
    group by dept_no having count(emp_no)>1 order by count(emp_no) desc
  */
  const dept_manager = await prisma.dept_manager.groupBy({
    by: ['dept_no'],
    select: { 
        dept_no: true 
    }, 
    _count: { 
        emp_no: true 
    }, 
    having: {
      emp_no: {
        _count: { gt: 1 },
      },
    },
    orderBy: {
        _count: { 
            emp_no: 'desc' 
        }
    }
  })
  dept_manager.map(rec => console.log(rec))
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
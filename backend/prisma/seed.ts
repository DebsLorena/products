import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await Promise.all([
    prisma.product.create({
      data: {
        nome: 'Notebook Dell Inspiron',
        categoria: 'Eletrônicos',
        descricao: 'Notebook para desenvolvimento',
        preco: 3500.00,
        quantidade_estoque: 15,
      },
    }),
    prisma.product.create({
      data: {
        nome: 'Mouse Logitech MX Master',
        categoria: 'Periféricos',
        descricao: 'Mouse ergonômico profissional',
        preco: 450.00,
        quantidade_estoque: 30,
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

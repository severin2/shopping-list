import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

export async function getItems(): Promise<Item[]> {
  return prisma.item.findMany();
}

export async function getItem(id: number): Promise<Item | null> {
  return prisma.item.findUnique({ where: { id } });
}

export async function createItem(data: {
  name: string;
  description: string;
  quantity: number;
}): Promise<Item> {
  return prisma.item.create({ data });
}

export async function deleteItem(id: number): Promise<void> {
  await prisma.item.delete({ where: { id } });
}

export async function updateItem(
  id: number,
  data: {
    name: string;
    description: string;
    quantity: number;
    isPurchased: boolean;
  }
): Promise<Item> {
  return prisma.item.update({
    where: { id },
    data,
  });
}

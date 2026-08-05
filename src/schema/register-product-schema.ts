import z from 'zod'

export const registerProductSchema = z.object({
  name: z.string().min(4, 'O nome do produto é obrigatório'),
  value: z.string().min(1, 'O preço do produto é obrigatório'),
  stock: z.string().min(1, 'A quantidade em estoque é obrigatória'),
  category: z.string().min(1, 'A categoria do produto é obrigatória'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
})

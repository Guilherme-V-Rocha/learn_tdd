import saveIcon from '@/images/saveIcon.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useToastContext } from '../context/ToastContext'

type RegisterProductProps = {
  isModalOpen?: boolean
}

const schema = z.object({
  name: z.string().min(4, 'O nome do produto é obrigatório'),
  value: z.string().min(1, 'O preço do produto é obrigatório'),
  stock: z.string().min(1, 'A quantidade em estoque é obrigatória'),
  category: z.string().min(1, 'A categoria do produto é obrigatória'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
})

type CreateSchema = z.infer<typeof schema>

export function RegisterProduct({ isModalOpen }: RegisterProductProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSchema>({
    resolver: zodResolver(schema),
  })

  const { triggerToast } = useToastContext()

  function create(data: CreateSchema) {
    console.log(data)
    triggerToast('Produto cadastrado com sucesso!', 'success')
  }

  return (
    <dialog
      open={isModalOpen}
      // onClose={() => setIsModalOpen(false)}
      className="bg-white p-8 rounded-2xl shadow-lg justify-self-center"
    >
      <form
        className="flex flex-col min-w-2xl gap-7"
        onSubmit={handleSubmit(create)}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="product-name"
            className="text-sm font-medium text-gray-700"
          >
            Nome do Produto*
          </label>
          <input
            {...register('name')}
            type="text"
            id="product-name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex gap-6 ">
          <div className="flex flex-col w-full">
            <label
              htmlFor="value"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Preço*
            </label>
            <input
              {...register('value')}
              type="text"
              id="value"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Quantidade em Estoque*
            </label>
            <input
              {...register('stock')}
              id="stock"
              type="text"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Categoria*
          </label>
          <select
            {...register('category')}
            id="category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Selecione uma categoria</option>
            <option value="eletronico">Eletrônico</option>
            <option value="vestuario">Vestuário</option>
            <option value="alimentos">Alimentos</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Descrição
          </label>
          <textarea
            {...register('description')}
            id="description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="imageUrl"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            URL da Imagem
          </label>
          <input
            {...register('imageUrl')}
            type="text"
            id="imageUrl"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            onClick={() => {}}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Image src={saveIcon} alt="" />
            Cadastrar Produto
          </button>
        </div>
      </form>
    </dialog>
  )
}

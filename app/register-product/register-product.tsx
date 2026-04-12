type RegisterProductProps = {
  isModalOpen?: boolean
}

export function RegisterProduct({ isModalOpen }: RegisterProductProps) {
  return (
    <dialog
      open={isModalOpen}
      // onClose={() => setIsModalOpen(false)}
      className="bg-white p-6 rounded shadow-lg w-full h-full"
    >
      <form>
        <div className="flex flex-col">
          <label htmlFor="product-name">Nome do Produto</label>
          <input
            type="text"
            id="product-name"
            className="border border-amber-600"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="value">Preço</label>
            <input
              type="text"
              id="value"
              className="border w-full border-amber-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock">Quantidade em Estoque</label>
            <input type="text" id="stock" className="border border-amber-600" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Categoria</label>
          <select id="category" className="border border-amber-600">
            <option value="">Selecione uma categoria</option>
            <option value="eletronico">Eletrônico</option>
            <option value="vestuario">Vestuário</option>
            <option value="alimentos">Alimentos</option>
          </select>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" className="border border-amber-600" />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="image-url">URL da Imagem</label>
          <input
            type="text"
            id="image-url"
            className="border border-amber-600"
          />
        </div>
        <div className="flex">
          <button
            type="button"
            className="cursor-pointer border px-6 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer w-full sm:w-auto bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Cadastrar Produto
          </button>
        </div>
      </form>
    </dialog>
  )
}

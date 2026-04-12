import Home from '@/app/page'
import { RegisterProduct } from '@/app/register-product'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('RegisterProduct', () => {
  describe('Home', () => {
    beforeEach(() => {
      render(<Home />)
    })

    it('Existe o botão novo produto', () => {
      expect(
        screen.getByRole('button', { name: 'Novo Produto' }),
      ).toBeInTheDocument()
    })
    it('Deve abrir o modal ao clicar', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Novo Produto' }))
      const modal = await screen.findByRole('dialog')
      expect(modal).toBeInTheDocument()
    })
  })

  describe('form product', () => {
    beforeEach(() => {
      render(<Home />)
    })

    it('shows the form to register a product', () => {
      render(<RegisterProduct isModalOpen={true} />)

      expect(screen.getByLabelText('Nome do Produto')).toBeInTheDocument()
      expect(screen.getByLabelText('Preço')).toBeInTheDocument()
      expect(screen.getByLabelText('Quantidade em Estoque')).toBeInTheDocument()
      expect(screen.getByLabelText('Categoria')).toBeInTheDocument()
      expect(screen.getByLabelText('Descrição')).toBeInTheDocument()
      expect(screen.getByLabelText('URL da Imagem')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Cancelar' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Cadastrar Produto' }),
      ).toBeInTheDocument()
    })

    it('', () => {})
  })
})

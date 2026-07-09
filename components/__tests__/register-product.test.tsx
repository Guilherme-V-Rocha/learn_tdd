import { ToastProvider } from '@/app/context/ToastContext'
import Home from '@/app/page'
import { RegisterProduct } from '@/app/register-product'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('RegisterProduct', () => {
  describe('Home', () => {
    beforeEach(() => {
      render(<Home />)
    })

    it('There is a "New Product" button.', () => {
      expect(
        screen.getByRole('button', { name: 'Novo Produto' }),
      ).toBeInTheDocument()
    })
    it('Should open the modal when clicked', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Novo Produto' }))
      const modal = await screen.findByRole('dialog')
      expect(modal).toBeInTheDocument()
    })
  })

  describe('form product', () => {
    it('shows the form to register a product', () => {
      render(<RegisterProduct isModalOpen={true} />)

      expect(screen.getByLabelText('Nome do Produto*')).toBeInTheDocument()
      expect(screen.getByLabelText('Preço*')).toBeInTheDocument()
      expect(
        screen.getByLabelText('Quantidade em Estoque*'),
      ).toBeInTheDocument()
      expect(screen.getByLabelText('Categoria*')).toBeInTheDocument()
      expect(screen.getByLabelText('Descrição')).toBeInTheDocument()
      expect(screen.getByLabelText('URL da Imagem')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Cancelar' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Cadastrar Produto' }),
      ).toBeInTheDocument()
    })

    it('shows errors in required fields when empty', async () => {
      const user = userEvent.setup()
      render(<RegisterProduct isModalOpen={true} />)

      await user.click(
        screen.getByRole('button', { name: 'Cadastrar Produto' }),
      )

      expect(
        screen.getByText(/O nome do produto é obrigatório/i),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/O preço do produto é obrigatório/i),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/A quantidade em estoque é obrigatória/i),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/A categoria do produto é obrigatória/i),
      ).toBeInTheDocument()
    })

    it('You must register using valid information.', async () => {
      const user = userEvent.setup()

      render(
        <ToastProvider>
          <RegisterProduct isModalOpen={true} />
        </ToastProvider>,
      )
      await user.type(
        screen.getByLabelText('Nome do Produto*'),
        'Produto Teste',
      )
      await user.type(screen.getByLabelText('Preço*'), '100')
      await user.type(screen.getByLabelText('Quantidade em Estoque*'), '10')
      await user.selectOptions(
        screen.getByLabelText('Categoria*'),
        'eletronico',
      )
      await user.type(
        screen.getByLabelText('Descrição'),
        'Descrição do produto teste',
      )
      await user.type(
        screen.getByLabelText('URL da Imagem'),
        'https://example.com/image.jpg',
      )

      await user.click(
        screen.getByRole('button', { name: 'Cadastrar Produto' }),
      )

      expect(
        screen.getByText('Produto cadastrado com sucesso!'),
      ).toBeInTheDocument()
    })
  })
})

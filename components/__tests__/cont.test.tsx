import { Count } from '@/app/count'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// describe agrupa testes relacionados
describe('Count', () => {
  it('deve mostrar 0 inicialmente', () => {
    render(<Count />)
    // getByText busca pelo texto visível
    expect(screen.getByText('0')).toBeInTheDocument()
  })
  it('deve incrementar ao clicar em +', async () => {
    const user = userEvent.setup()
    render(<Count />)
    await user.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

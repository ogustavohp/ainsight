import Link from 'next/link'
import { Typography } from './typography'
import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="flex justify-center flex-col items-center">
      <Separator />
      <div className="flex items-center justify-center flex-1 p-2 text-center">
        <Typography variant="muted">
          Projeto desenvolvido por{' '}
          <Link
            href={'https://github.com/ogustavohp/ainsight'}
            target="_blank"
            className="text-foreground hover:text-foreground/90"
          >
            @ogustavohp
          </Link>{' '}
          durante 2ª Edição da Imersão Inteligência Artificial da Alura, com o
          apoio do Google.
        </Typography>
      </div>
    </footer>
  )
}

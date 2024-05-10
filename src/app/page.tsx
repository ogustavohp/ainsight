import { InputFile } from '@/components/input-file'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { prompts } from '@/db/db'

export default function Home() {
  const response = [
    {
      resumoPrompt: 'Gere a descrição.',
      response:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, sit ut accusamus quasi officia unde tenetur maiores quibusdam alias maxime numquam necessitatibus excepturi, id mollitia, soluta itaque porro nisi perspiciatis.',
    },
    {
      resumoPrompt: 'Gere a descrição2.',
      response:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, sit ut accusamus quasi officia unde tenetur maiores quibusdam alias maxime numquam necessitatibus excepturi, id mollitia, soluta itaque porro nisi perspiciatis.',
    },
    {
      resumoPrompt: 'Gere a descrição3.',
      response:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, sit ut accusamus quasi officia unde tenetur maiores quibusdam alias maxime numquam necessitatibus excepturi, id mollitia, soluta itaque porro nisi perspiciatis.',
    },
  ]

  return (
    <>
      <div className="flex flex-1">
        <div className="w-80">
          <Button>Novo chat</Button>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex flex-col gap-4 flex-1 mx-6 my-4">
          <div className="flex gap-2 flex-wrap">
            {prompts.map((e) => (
              <Button key={e.id}>{e.title}</Button>
            ))}
          </div>
          <div className="flex flex-col justify-end flex-1 border rounded-md p-4 space-y-2">
            {response.map((e, i) => (
              <div key={e.resumoPrompt + i} className="flex flex-col space-y-2">
                <div className="bg-zinc-800 float-end self-end rounded-s-2xl rounded-b-2xl px-2 py-2">
                  <Typography>{e.resumoPrompt}</Typography>
                </div>
                <div className="bg-zinc-800 inline-block rounded-e-2xl rounded-b-2xl px-2 py-2">
                  <Typography>{e.response}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="w-80">
          <InputFile />
        </div>
      </div>
    </>
  )
}

import Container from '@/components/ui/Container'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <Container className='my-16 flex justify-center '>
      <SignUp />
    </Container>

)}
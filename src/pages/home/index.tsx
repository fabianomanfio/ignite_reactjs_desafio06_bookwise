import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { ButtonContainer, Container, Heading, ImageContainer, LoginContainer } from './styled';

import home_bookwise from "@/assets/home_bookwise.svg"; 
import GoogleIcon from '@/assets/icons/logos-google-icon.svg'
import GitHubIcon from '@/assets/icons/akar-icons-github-fill.svg'
import OthersIcon from '@/assets/icons/rocket-launch.svg'
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';

enum Size {
  sm = "sm",
  lg = "lg",
}

export default function Home() {
    const session = useSession()
    const router = useRouter()
    const isSignedIn = session.status === 'authenticated'

  if (isSignedIn) {
    router.push("/start");
  }

    async function handleConnect(provider: string){
      await signIn(provider) 
    }

  async function handleNavigateStart() { 
    await router.push('/start')
  }

  return (
    <Container>
      <ImageContainer>
        {/* <Image src={home_bookwise} alt="BookWise" priority /> */}
        <Image
          src={home_bookwise}
          alt=""
          placeholder="blur"
          blurDataURL="../../assets/home_bookwise.svg"
        />
      </ImageContainer>

      <LoginContainer>
        <div>
          <Heading>
            <h1>Boas Vindas!</h1>
            {!isSignedIn ? (
              <span>Faça seu login ou acesse como visitante.</span>
            ) : (
              <span></span>
            )}
          </Heading>

          <ButtonContainer>
            <Button
              title="Entrar com Google"
              size={Size.lg}
              icon={<Image src={GoogleIcon} alt="" />}
              onClick={() => handleConnect("google")}
            />
            <Button
              title="Entrar com GitHub"
              size={Size.lg}
              icon={<Image src={GitHubIcon} alt="" />}
            />
            <Button
              title="Acessar como Visitante"
              size={Size.lg}
              icon={<Image src={OthersIcon} alt="" />}
              onClick={() => router.push("/start")}
            />
          </ButtonContainer>
        </div>
      </LoginContainer>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))
  if (session) {
    return {
      redirect: {
        destination: '/start',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
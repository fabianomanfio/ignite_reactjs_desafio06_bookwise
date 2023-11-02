import * as RadixDialog from "@radix-ui/react-dialog";
import { CloseButton, ContentContainer, Overlay, Title } from "./styles";
import { X } from "phosphor-react";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import Image from "next/image";

import GoogleIcon from "@/assets/icons/logos-google-icon.svg";
import GitHubIcon from "@/assets/icons/akar-icons-github-fill.svg";
import { ButtonContainer } from '@/pages/home/styled';

enum Size {
  sm = "sm",
  lg = "lg",
}

export default function LoginDialog() {
  async function handleConnect(provider: string) {
    await signIn(provider);
  }

  return (
    <RadixDialog.Portal>
      <Overlay />

      <ContentContainer>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Title>Faça login para deixar sua avaliação</Title>
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
        </ButtonContainer>
      </ContentContainer>
    </RadixDialog.Portal>
  );
}

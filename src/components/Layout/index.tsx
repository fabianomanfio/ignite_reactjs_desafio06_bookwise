import Image from 'next/image';
import { ReactNode } from 'react'
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { ChartLineUp, Binoculars, SignIn, User, SignOut } from "phosphor-react";
import * as RadixDialog from "@radix-ui/react-dialog";

import {
  LayoutWrapper,
  LoginButton,
  MenuContainer,
  NavLink,
  NavMenu,
  ProfileContainer,
} from "./styles";
import logoImage from "../../assets/book_wise_brand.svg";
import LoginDialog from '../LoginDialog';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({children}: LayoutProps) {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status !== "loading") {
    return (
      <LayoutWrapper>
        <MenuContainer>
          <header>
            <Image src={logoImage} priority alt="" />
            <NavMenu>
              <NavLink href="/start" selected={router.pathname === "/start"}>
                <ChartLineUp
                  size={24}
                  weight={router.pathname === "/start" ? "bold" : "regular"}
                />
                <span>Início</span>
              </NavLink>
              <NavLink
                href={"/explore"}
                selected={router.pathname === "/explore"}
              >
                <Binoculars
                  size={24}
                  weight={router.pathname === "/start" ? "bold" : "regular"}
                />
                <span>Explorar</span>
              </NavLink>
              {status === "authenticated" && (
                <NavLink
                  href={`/profile/${session.user.id}`}
                  selected={router.pathname === "/profile"}
                >
                  <User
                    size={24}
                    weight={router.pathname === "/start" ? "bold" : "regular"}
                  />
                  <span>Perfil</span>
                </NavLink>
              )}
            </NavMenu>
          </header>

          {status === "authenticated" ? (
            <ProfileContainer>
              <div>
                {session?.user.image ? (
                  <Image
                    src={session?.user.image}
                    alt=""
                    width={40}
                    height={40}
                  />
                ) : (
                  <User size={40} />
                )}
              </div>
              <span>{session.user?.name}</span>
              <button onClick={() => signOut()}>
                <SignOut size={20} weight="regular" color="#F75A68" />
              </button>
            </ProfileContainer>
          ) : (
            <RadixDialog.Root>
              <RadixDialog.Trigger asChild>
                <LoginButton>
                  <span>Fazer login</span>
                  <SignIn size={24} weight="regular" color="#50B2C0" />
                </LoginButton>
              </RadixDialog.Trigger>
              <LoginDialog />
            </RadixDialog.Root>
          )}
        </MenuContainer>
        {children}
      </LayoutWrapper>
    );
  }
}
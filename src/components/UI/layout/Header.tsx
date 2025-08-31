"use client";

import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationModal from "@/components/UI/modals/registration.modal";
import LoginModal from "@/components/UI/modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.title}
      width={40}
      height={40}
      className="rounded-full"
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();

  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("Error signing out:", error);
    }

    setAuthState("unauthenticated", null);
  };

  const getNavItems = () => {
    return siteConfig.navItems
    .filter((item)=>{
      if (item.href === "/ingredients"){
      return isAuth;
      }
      return true;
    })
    .map((item) => {
      const isActive = pathname === item.href;
      return (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            className={`px-3 py-1
                ${isActive ? "text-blue-500" : "text-foreground"}
                hover:text-blue-300 hover:border
                hover:border-blue-300 hover:rounded-md
                transition-colors
                transition-border
                duration-200`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar style={{ height: layoutConfig.headerHeight }}>
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuth && <p>Привет, {session?.user?.email}!</p>}
        {status === "loading" ? (
          <li><p>Загрузка...</p></li>
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={handleSignOut}
              >
                Выйти
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => {
          setIsRegistrationOpen(false);
        }}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
        }}
      />
    </Navbar>
  );
}

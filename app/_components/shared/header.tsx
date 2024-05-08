"use client";

import Image from "next/image";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  NotebookPenIcon,
  ScrollTextIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cart from "../cart/cart";
import { useState } from "react";

const Header = () => {
  const { data } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/Logo-Fsw-Food.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex gap-2">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent"
              disabled={!data?.user}
            >
              <NotebookPenIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent"
            >
              <UserIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={data?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {data?.user?.name?.split(" ")[0][0]}
                        {data?.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{data?.user?.name}</h3>
                      <span className="block text-xs text-muted-foreground">
                        {data?.user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pt-10">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" onClick={handleSignInClick}>
                    <LogInIcon />
                  </Button>
                </div>
              </>
            )}

            <div className="py-6">
              <Separator />
            </div>

            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              >
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Button>

              {data?.user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                    asChild
                  >
                    <Link href="/my-orders">
                      <ScrollTextIcon size={16} />
                      <span className="block">Meus Pedidos</span>
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                    asChild
                  >
                    <Link href="/my-favorite-restaurants">
                      <HeartIcon size={16} />
                      <span className="block">Restaurantes Favoritos</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="py-6">
              <Separator />
            </div>

            {data?.user && (
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                onClick={handleSignOutClick}
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;

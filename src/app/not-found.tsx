"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/logo.png" alt="Logo" width={300} height={300} />
      <div className="text-8xl font-bold text-gray-300">404</div>
      <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>
      <div className="pt-6">
        <Button as={Link} href="/" color="primary" variant="shadow">
          На главную
        </Button>
      </div>
    </div>
  );
}

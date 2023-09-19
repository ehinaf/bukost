"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ButtonSignIn() {
  const [open, setOpen] = useState(false);

  const onHadleClick = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={onHadleClick}>
        <Button variant="default">Masuk</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Masuk Ke BuKost</DialogTitle>
          <DialogDescription className="text-base">
            Ingin masuk sebagai ?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center text-center gap-4">
            <Link
              href="/tenant/sign-in"
              className="shadow-lg rounded-lg py-10 items-center font-medium hover:bg-slate-50"
              onClick={onHadleClick}
            >
              Pencari Kos
            </Link>
            <Link
              href="/owner/sign-in"
              className="shadow-lg rounded-lg py-10 items-center font-medium hover:bg-slate-50"
              onClick={onHadleClick}
            >
              Pemilik Kos
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

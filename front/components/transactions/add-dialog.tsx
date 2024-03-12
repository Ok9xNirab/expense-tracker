"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SvgPlus from "@/components/svg/plus";
import { useState } from "react";
import { AddTransaction } from "../form/add-transaction";

export default function AddDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SvgPlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Add your transaction here.</DialogDescription>
        </DialogHeader>
        <AddTransaction setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

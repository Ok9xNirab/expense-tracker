"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Dispatch, type SetStateAction, useState } from "react";
import { EditTransaction } from "../form/edit-transaction";

type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditDialog({ open, setOpen }: PropsType) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Update your transaction here.</DialogDescription>
        </DialogHeader>
        <EditTransaction setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

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
import { AddSource } from "@/components/form/add-source";
import { useState } from "react";

export default function AddSourceDialog() {
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
          <DialogTitle>Add Source</DialogTitle>
          <DialogDescription>
            Add your custom income/outcome source here.
          </DialogDescription>
        </DialogHeader>
        <AddSource setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

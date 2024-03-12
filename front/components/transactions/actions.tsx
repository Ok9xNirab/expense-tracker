"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SvgThreeDots from "@/components/svg/three-dots";
import { AlertDialog } from "@/components/ui/alert-dialog";
import ConfirmDialog from "../dialogs/confirm";
import { useState } from "react";
import { requestAPI } from "@/utils/session";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Transaction from "@/types/Transaction";
import TransactionContext from "@/store/transaction-row";
import EditDialog from "./edit-dialog";

export default function RowActions({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { id } = transaction;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deleteTransaction() {
    setLoading(true);
    const data = await requestAPI<[]>(`/transactions/${id}`, {
      method: "DELETE",
    });
    setLoading(false);

    if ("message" in data) {
      return toast({
        title: data.message || "Something went Wrong!",
        variant: "destructive",
      });
    }

    toast({
      title: "Transaction deleted !",
    });

    setConfirmOpen(false);
    router.refresh();
  }

  return (
    <TransactionContext.Provider value={transaction}>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ConfirmDialog
          body=" This action cannot be undone. This will permanently delete transaction!"
          loading={loading}
          confirm={deleteTransaction}
        />
      </AlertDialog>
      <EditDialog open={openEditForm} setOpen={setOpenEditForm} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SvgThreeDots className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenEditForm(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TransactionContext.Provider>
  );
}

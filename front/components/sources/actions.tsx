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
import EditSourceDialog from "./edit-dialog";
import Source from "@/types/Source";
import SourceContext from "@/store/source-row";

export default function RowActions({ source }: { source: Source }) {
  const { id } = source;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deleteSource() {
    setLoading(true);
    const data = await requestAPI<[]>(`/sources/${id}`, {
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
      title: "Source deleted !",
    });

    setConfirmOpen(false);
    router.refresh();
  }

  return (
    <SourceContext.Provider value={source}>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ConfirmDialog
          body=" This action cannot be undone. This will permanently delete source!"
          loading={loading}
          confirm={deleteSource}
        />
      </AlertDialog>
      <EditSourceDialog open={openEditForm} setOpen={setOpenEditForm} />
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
    </SourceContext.Provider>
  );
}

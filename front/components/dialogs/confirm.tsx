import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  title?: string;
  body: string;
  loading: boolean;
  confirm: () => void;
};

export default function ConfirmDialog({
  title = "Are you absolutely sure?",
  body,
  confirm,
  loading,
}: Props) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{body}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button disabled={loading} onClick={() => confirm()}>
          {loading && <ReloadIcon className="mr-2 animate-spin" />}
          Confirm
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

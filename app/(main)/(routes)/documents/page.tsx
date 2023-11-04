"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { toast } from "sonner";

const Documents = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create new a note.",
    });
  };
  return (
    <>
      <div className=" h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/empty.png"
          alt="Empty"
          className="dark:hidden"
          width="300"
          height="300"
        />
        <Image
          src="/empty-dark.png"
          alt="Empty"
          className="hidden dark:block"
          width="300"
          height="300"
        />
        <h2 className="text-lg font-medium">
          Welcome to {user?.firstName}&apos;s Notion{" "}
        </h2>
        <Button onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create new note
        </Button>
      </div>
    </>
  );
};

export default Documents;

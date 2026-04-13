"use client";

import { Trash2 } from "lucide-react";
import { deleteJob } from "../../../actions/jobActions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";


export default function DeleteJobButton({ jobId }: { jobId: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this job?")) {
            startTransition(async () => {
                const result = await deleteJob(jobId);
                if (result.success) {
                    alert("Job deleted successfully!");
                    router.refresh();
                } else {
                    alert(result.error);
                }
            });
        }
    };

    return (
        <button 
            onClick={handleDelete} 
            disabled={isPending}
            className={`cursor-pointer hover:scale-110 transition ${isPending ? 'opacity-50' : ''}`}
        >
            <Trash2 className="text-red-500" size={20} />
        </button>
    );
}

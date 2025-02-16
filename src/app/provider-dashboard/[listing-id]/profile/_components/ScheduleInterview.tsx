import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ScheduleInterview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-zinc-800 text-white">
          Schedule Interview
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Video introductions help families get to know our care providers
            personally. We focus on promoting you as an individual, which is far
            more effective in attracting new residents than simply promoting
            your AFH.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[500px] w-full">
          {/* <Calendly /> */}
          <iframe
            src="https://calendly.com/carefinderwa/interview"
            className="h-[500px] w-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

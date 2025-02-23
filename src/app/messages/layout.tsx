import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MessagingSidebar from "./_components/MessagingSidebar";
import RealtimeMessageHandler from "./_components/RealTimeMessageHandler";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RealtimeMessageHandler />
      <ResizablePanelGroup direction="horizontal" className="mt-4 bg-[#1c1c1c]">
        <MessagingSidebar />
        <ResizableHandle withHandle className="bg-white/10" />

        {children}
      </ResizablePanelGroup>
    </div>
  );
}

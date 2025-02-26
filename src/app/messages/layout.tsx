import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import MessagingSidebar from "./_components/MessagingSidebar";
import RealtimeMessageHandler from "./_components/RealTimeMessageHandler";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RealtimeMessageHandler />
      <ResizablePanelGroup direction="horizontal" className="mt-4 bg-border">
        <MessagingSidebar />
        <ResizableHandle withHandle className="bg-white/10" />
        <ResizablePanel
          className="relative flex min-h-[94vh] w-full flex-col bg-gray-50"
          defaultSize={20}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

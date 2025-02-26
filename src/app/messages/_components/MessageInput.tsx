"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useMessage } from "@/store/messagingStore";
import supabase from "@/server/db/supabase-client";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string().refine((data) => data.trim() !== "", {
    message: "Message cannot be empty",
  }),
});

function MessageInput() {
  const params = useParams();
  const conversationId = params?.id as string;

  // Message store functions
  const addMessageToConversation = useMessage(
    (state) => state.addMessageToConversation,
  );
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const removeMessageFromConversation = useMessage(
    (state) => state.removeMessageFromConversation,
  );

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // Check if conversation exists
  if (!conversationId) {
    console.error("No conversation ID available");
    return (
      <div className="border-t border-white/10 p-4">
        <p className="text-sm text-red-400">Error: No conversation selected</p>
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to send messages");
      return;
    }

    try {
      // First verify the conversation exists in Supabase
      const { data: dbConversation, error: checkError } = await supabase
        .from("conversations")
        .select("id, created_at, name")
        .eq("id", conversationId)
        .single();

      if (checkError ?? !dbConversation) {
        console.error("Conversation not found in database:", checkError);
        toast.error("Conversation not found. Please refresh the page.");
        return;
      }

      console.log(dbConversation);
      // Create a new message object
      const messageId = nanoid();
      const newMessage = {
        id: messageId,
        createdAt: new Date().toISOString(),
        conversationId: conversationId,
        userId: session.user.id,
        message: values.message,
        read: false,
        isEdit: false,
      };
      console.log(newMessage);
      // Add message optimistically
      addMessageToConversation(conversationId, newMessage);
      setOptimisticIds(messageId);
      form.reset();

      // Prepare message data for Supabase
      const messageData = {
        id: messageId,
        conversation_id: conversationId,
        user_id: session.user.id,
        message: values.message,
        read: false,
        is_edit: false,
        created_at: new Date().toISOString(),
      };
      console.log(messageData);

      // Insert message into database
      const { error } = await supabase.from("messages").insert(messageData);

      if (error) {
        console.error("Supabase insert error:", {
          error,
          messageData,
          conversationId,
        });
        removeMessageFromConversation(conversationId, messageId);
        toast.error("Failed to send message. Please try again.");
        return;
      }

      // add any additional logic (like slack notifications),
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="border-t border-border p-4 pb-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Message"
                    className="border-0 bg-background focus-visible:ring-1 focus-visible:ring-gray-400"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size="icon"
            variant="ghost"
            type="submit"
            className="text-gray-400 hover:text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageInput;

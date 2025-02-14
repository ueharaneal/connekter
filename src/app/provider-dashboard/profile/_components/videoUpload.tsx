import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const VideoUpload = () => {
  // const [preview, setPreview] = useState(null); // State to store the image preview
  const [video, setVideo] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // TRPC mutation to update DB
  // const { mutate: updateImage, isPending } = trpc.provider.updateProvider.useMutation();

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const videoUrl = URL.createObjectURL(selectedFile);
      setVideo(videoUrl);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"] }, // Only allow videos
    multiple: false,
  });

  const removeVideo = () => {
    setVideo(null);
    setFile(null);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputFileRef.current?.click(); // Trigger the file input on button click
  };

  const saveVideo = () => {
    if (file) {
      const formData = new FormData();
      formData.append("video", file);
      console.log(formData);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed p-6 text-center"
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium">Drag and drop video here or</p>
      </div>

      {/* Button to select photo files */}
      <Button
        variant="outline"
        className="border-pink-500 bg-transparent text-white hover:bg-pink-500/20"
        onClick={handleButtonClick}
      >
        <Download className="mr-2 h-4 w-4" />
        Select Video
        <input {...getInputProps()} className="hidden" ref={inputFileRef} />
      </Button>

      {/* Image Preview */}
      {video && (
        <div className="relative h-full w-full">
          <video
            src={video}
            className="h-full w-full rounded-lg object-cover"
          />
          <button
            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
            onClick={removeVideo}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Save Button */}
      {file && (
        <Button onClick={saveVideo} variant="outline">
          Save
        </Button>
      )}
    </div>
  );
};

export default VideoUpload;

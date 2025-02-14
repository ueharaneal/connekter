import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { trpc } from "@/server/client";

const PhotoUpload = () => {
  // const [preview, setPreview] = useState(null); // State to store the image preview
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // TRPC mutation to update DB
  // const { mutate: updateImage, isPending } = trpc.provider.updateProvider.useMutation();

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Only allow images
    multiple: false,
  });

  const removeImage = () => {
    setImage(null);
    setFile(null);
  };

  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    inputFileRef.current?.click(); // Trigger the file input on button click
  };

  const saveImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
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
        <p className="text-lg font-medium">Drag and drop photos here or</p>
      </div>

      {/* Button to select photo files */}
      <Button
        variant="outline"
        className="border-pink-500 bg-transparent text-white hover:bg-pink-500/20"
        onClick={handleButtonClick}
      >
        <Download className="mr-2 h-4 w-4" />
        Select Photo
        <input {...getInputProps()} className="hidden" ref={inputFileRef} />
      </Button>

      {/* Image Preview */}
      {image && (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt="Profile"
            className="h-full w-full rounded-lg object-cover"
          />
          <button
            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
            onClick={removeImage}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Save Button */}
      {file && (
        <Button onClick={saveImage} variant="outline">
          Save
        </Button>
      )}
    </div>
  );
};

export default PhotoUpload;

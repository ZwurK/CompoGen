import { useToast } from "vue-toastification";

export default function useCopy() {
  const toast = useToast();
  const copyToClipboard = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Code copied to clipboard.", {
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error has occurred.", {
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  }

  return { copyToClipboard };
}

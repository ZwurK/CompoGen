import { useToast } from "vue-toastification";

export default function useShare() {
  const toast = useToast();

  const share = (componentId) => {
    if (componentId === null) {
      toast.error("You must generate a component to share it.", {
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      navigator.clipboard
        .writeText("http://localhost:8080/component/" + componentId)
        .then(() => {
          toast.success("Link copied to clipboard.", {
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
  }

  return { share };
}

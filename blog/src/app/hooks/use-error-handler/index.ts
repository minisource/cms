import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const useErrorHandler = () => {
  const handleError = (error: AxiosError<any>) => {
    if (error.response?.status === 500)
      toast.error("خطای 0 - با تیم پشتیبانی تماس حاصل فرمایید.");
    else if (error.response?.status === 404)
      toast.error(
        "خطای 1 - " +
          `${
            error.response.data.message
              ? error.response.data.message
              : "با تیم پشتیبانی تماس حاصل فرمایید"
          }`
      );
    else if (error.response?.status === 405)
      toast.error("خطای 3 - پروتکل انتخابی اشتباه است.");
    else if (error.response?.status === 403) toast.error("عدم دسترسی");
    else if (error.response?.status === 429)
      toast.error("لطفا کمی صبرکنید و دوباره تلاش کنید!");
    else if (error.response?.status === 400)
      toast.error("خطای 2 - " + error.response.data.message);
    else if (error.response?.status === 401 || error.code === "401") {
      // null
    }
  };
  return { handleError };
};

export default useErrorHandler;


// else if (error.response?.status === 422)
//   toast.error("خطای 4 - " + error.response.data.message);

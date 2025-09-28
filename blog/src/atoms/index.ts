import { atom } from "recoil";

// const localStorageEffect =
//   (key :any) =>
//   ({ setSelf, onSet }) => {
//     const savedValue =
//       typeof window !== "undefined" ? localStorage.getItem(key) : null;
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue, _, isReset) => {
//       isReset
//         ? typeof window !== "undefined" && localStorage.removeItem(key)
//         : typeof window !== "undefined" &&
//           localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

// const authAtom = atom<{
//   optTokenTime: string;
//   phone: string;
//   email: string;
//   fullName: string;
//   isAuth: boolean;
//   authStep: "validation" | "email" | "otp" | "forget";
// }>({
//   key: "authAtom",
//   default: {
//     optTokenTime: "",
//     phone: "",
//     email: "",
//     fullName: "",
//     isAuth: false,
//     authStep: "validation",
//   },
//   effects: [localStorageEffect("auth")],
// });
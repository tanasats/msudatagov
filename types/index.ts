// types/index.ts
export interface User {
  id: string;
  username: string;
  name: string;
  faculty: string;
  email: string;
  role: string;
  // เพิ่ม field อื่นๆ ที่จำเป็น
}

export interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  accessToken: string | null;
}

export interface IUser {
    id?:number;
    username:string;
    name:string;
    email:string;
    usertype?:string;
    staffid?:string;
    faculty?:string;
    citizenid?:string;
    created?:string;
    updated?:string;
}
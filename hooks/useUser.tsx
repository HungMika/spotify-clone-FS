import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useState } from "react";

type UserContextType = {
  asccessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propname: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const asccessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState();
  const [userDetail, setUserDetail] = useState<UserDetails | null>();
  const [subscription, setSubscription] = useState<Subscription | null>();

  const getUserDetails = () => supabase.from("users").select("*").single();
};

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });
  } catch (error) {}
}

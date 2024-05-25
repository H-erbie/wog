import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const POST = async (req) => {
  try {
    const secret = "hinata.belinda";
    if (!secret) {
      throw new Error(
        "Missing NEXT_PUBLIC_SANITY_HOOK_SECRET environment variable"
      );
    }

    const { body, isValidSignature } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};

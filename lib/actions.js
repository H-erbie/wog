import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateHeros(){
    revalidateTag('heroBanner')
    redirect('/')
}
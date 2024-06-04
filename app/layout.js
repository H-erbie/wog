import "./globals.css";
import { fontSans } from "@/lib/font";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import SiteHeader from "@/components/site-header";
// import { SiteFooter } from "@/components/site-footer";
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import SiteFooter from "@/components/site-footer";
import InstallBtn from "@/components/install-btn";
import MobileNav from "@/components/mobile-nav";
// import {getServerSession} from 'next-auth'
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import {redirect} from 'next/navigation'
// import { user } from "@/lib/user";
import AdminHeader from "@/components/admin-header";
export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "./icon.ico",
  },
};

export default async function RootLayout({ children }) {
  const products = await client.fetch(groq`*[_type == "product"]`, {
    next: { revalidate: 30 },
  });

  const siteInfos = await sanityFetch({
    query: groq`*[_type == "siteInfo"]`,
    tags: ["siteInfo"],
  });
  const orders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags:["orders"]
  })
  const newOrders = orders.filter(
    (order) => !order.isDelivered && !order.isCancelled
  );

  // const orders = await sanityFetch({
  //   query: groq`*[_type == "orders"]`,
  //   tags: ["orders"],
  // });
  // console.log(orders.length);
  // const userInfo = user()
  //   const userStat  = userInfo && userInfo.user?.role
  //   const session = await getServerSession(authOptions)
  //   if(session?.user || userStat === 'unverified_user') redirect('/verify-email')

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#292e36" />
        <meta name="google-site-verification" content="zLkWB96jEYLxf5AWuzTVoOCWfKl23-g1nJBKT0YSZQI" />
      </head>
      <body className={fontSans.variable}>
        {" "}
        <Providers>
          <SiteHeader products={products} orders={orders} siteInfos={siteInfos} />
        <AdminHeader siteInfos={siteInfos}/> 
          <InstallBtn />
          {children}
          <SiteFooter siteInfos={siteInfos} />
          <MobileNav activeOrders={newOrders.length} />
        </Providers>
      </body>
    </html>
  );
}
export const revalidate = 60;

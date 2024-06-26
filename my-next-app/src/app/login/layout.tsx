import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>

        
      <div className="w-full h-full">
      {children}
        </div>

        
      
    </>
  )
}
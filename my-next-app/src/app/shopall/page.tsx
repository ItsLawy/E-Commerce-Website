import { ProductCard } from "./_components/ProductCard";
import { Header } from "./_components/Header";
import { Filters } from "./_components/Filters";
import { Contact } from "../(customer page)/_components/Contact";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { LoginWarning } from "../components/LoginWarning";
import db from "@/db/db";

//DataBaseQueries

const getProducts = async () => {
  return await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      imagepath: true,
      rating: true,
    },
  });
};


const getFavs = async () => {
  const session = await getServerSession(authConfig);
  if (!session) {
    return [];
  }

  const favs = await db.favorite.findMany({
    select: {
      postId: true,
    },
    where: {
      user: {
        id: session.user.id,
      },
    },
  });

  return favs.map((fav) => fav.postId);
}


//Components

export default function ShopAll() {
    return (
     <>
     <LoginWarning/>
      <Header/>
      <Navigation/>
      <MainSection/>  
      <Contact/>
     </>

    );  
  }

  async function ProductContainer(){
    const Products = await getProducts();
    const Favs = await getFavs();
   
    return(
        <div className="w-[75%] h-full justify-center grid grid-cols-3 gap-y-6 gap-2 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 relative">

        {Products.map((product) => (
          Favs.includes(product.id) ? 
          <ProductCard key={product.id} favs={true}  data={product} Style={{height:"fit-content"}}>
            <img loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
          </ProductCard>:
          <ProductCard key={product.id} favs={false}  data={product} Style={{height:"fit-content"}}>
            <img loading="lazy" src={product.imagepath} alt="" className="w-full object-contain"/>
          </ProductCard>
        ))}

        </div>
    )
  }

  function Navigation():JSX.Element{
    return(
        <div className="w-full h-[5vh] flex mb-9">
        </div>
    )
  }
  
  function MainSection ():JSX.Element{
    
      return(
        <div className=" w-full h-fit flex justify-center items-center xs:p-[5%] sm:p-[2%] mb-5 ">
          <div className="w-[95%] h-full flex justify-between 0">
          <Filters/>
          <ProductContainer/>
          </div>
    
        </div>
      )
    }





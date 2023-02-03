import { NextPageContext } from "next";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    router.push('/overview')
    return null
}

export const getServerSideProps = async (context: NextPageContext) => {
    return {
        redirect: {
            destination: '/overview'
        }
    }
  }
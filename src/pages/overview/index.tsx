import { DonutChart } from "@/components/charts";
import Devices from "@/components/Devices";
import Profile from "@/components/profile";
import Sidebar from "@/components/sidebar";
import StatsCard from "@/components/StatsCard"
import { api } from "@/services/api";
import { Box, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";

interface IProps {
  user: {
    name: string
    email: string
    avatar_url: string
    company: string
    language: string
    country: string
    city: string
  },
  installations: any
}

function Home({ user: { name, email, avatar_url, company, language, country, city }, installations }:IProps ) {
  return (
    <Sidebar>
      <Flex alignItems='center'>
        <Box>
        <Profile user={{
          name,
          email,
          avatar_url,
          company,
          language, 
          country, 
          city
        }} />
        </Box>
        <Devices {...installations} />  
      </Flex>
    </Sidebar>
  )
}

export const getServerSideProps = async ({ req, res }: NextPageContext | any) => {
  const { data } = await api.get<{ data: VRM.Info }>('/vrm/info')
  const installations = await api.get('/vrm/installations?extended=1')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
      props: {
          user: data,
          installations: installations.data
      },
  }
}

export default Home
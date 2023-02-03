/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import Sidebar from "@/components/sidebar";
import { api } from "@/services/api";
import { useColorModeValue, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Grid, GridItem, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

interface Props {
  installations: any
}

export default function Home({ installations }: any) {
  const router = useRouter()
  console.log(router.query.index)
  return (
    <Sidebar>
    {installations?.records?.map((item: any, index: number) => {
      return (
        <>
          {item.idSite === Number(router.query.index) && (
        <Accordion allowToggle>
        <AccordionItem overflowX={['auto', 'hidden']} width={[320, 1136]} border={'2'} borderColor='orange.600'>
            <AccordionButton width={['auto', 1136]} maxWidth={[1136]}>
              <Box as="span" flex='1' fontWeight={500} textColor='orange.500' textAlign='left'>
                {item?.name} [{item.extended.length}] - {String(new Date(item.last_timestamp).toGMTString().toString())} - {item.timezone}
              </Box>
              <AccordionIcon color={'orange.600'} />
            </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex display='block' width={1000} flexDirection='column' maxHeight='100vh'>
              {item.extended.map((extend: any, index: number) => {
                if (extend.formattedValue) {
                  const date = String(new Date(Number(extend.timestamp)))
                  return (
                    <Box mb='-40' display='inline-block' key={index} w='200px' h='200px'>
                      <Text bg="orange.600" p='1' textAlign={'center'} textColor={useColorModeValue('white', 'white')}>
                        {extend.description}
                      </Text>
                      <Box border={'1px'} textAlign={'center'} borderColor={'orange.800'}>
                        <Text textColor={'orange.700'} size='lg'>{extend.formattedValue}</Text>
                      </Box>
                      <Box bg='orange.900' border={'1px'} textAlign={'center'} borderColor={'orange.800'}>
                        <Text textColor={'orange.300'} size='lg'>{String(date == 'Invalid Date' ? 'Now' : date.split('GMT')[0]) ?? "Real Time"}</Text>
                      </Box>
                    </Box>
                    )
                }
              })}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
          )}
          </>
      )
    })}
    </Sidebar>
  )
}


export const getServerSideProps = async ({ req, res }: any) => {
  const installations = await api.get('/vrm/installations?extended=1')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
      props: {
          installations: installations.data
      }
  }
}
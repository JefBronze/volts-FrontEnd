/* eslint-disable react/jsx-key */
import { Text, Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, ListItem, List, ListIcon } from "@chakra-ui/react";
import Link from "next/link";
import { GoAlert } from "react-icons/go";

export default function Devices(props: any) {
    console.log(props)
    return (
<Card width={'100%'}>
  <CardHeader>
    <Heading size='md'>Devices</Heading>
  </CardHeader>
  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
        My Installations [{props?.records.length}]
        </Heading>
        <Text pt='2' fontSize='sm'>
        View a summary of all your devices instllations.
        </Text>
      </Box>
      <Box overflowY={'auto'} maxHeight='300px'>
      {props?.records.map((item: any, index: number) => {
            return (<Link href={`/system/${item?.idSite}`} key={index}>
<Box border='1px' css={{
    _hover: {
        bg: 'white'
    }
}} borderColor='gray.600' p='4' borderRadius={'6px'}>
            <Heading size='xs' textTransform='uppercase'>
            {String(item?.device_icon).toUpperCase()}
              </Heading>
              <Text fontSize='sm'>
              {String(item?.name)}
              </Text>  
            <Stack mt='3' spacing={3}>
                {item?.extended.map((extended: any, index: number) => {
                    if([144, 143, "consumption"].includes(extended?.idDataAttribute ?? extended?.code)) {
                        return (
                    <Box key={index}>
                        <Heading size='xs' textTransform='uppercase'>
                        {extended?.description}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                        {extended?.formattedValue}
                        </Text>
                    </Box>
                        )
                    }
                })}
              </Stack>
              <List spacing={3}>
            {item?.current_alarms.map((alarm: any, index: number) => {
                return (
                    <ListItem key={index}>
                    <ListIcon as={GoAlert} color='red.500' />
                   {alarm}
                  </ListItem>
                )
            })}
  </List>
            </Box>
            </Link>)
        })}
      </Box>
    </Stack>
  </CardBody>
</Card>
    )
}